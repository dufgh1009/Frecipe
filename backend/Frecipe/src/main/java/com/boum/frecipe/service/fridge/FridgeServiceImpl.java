package com.boum.frecipe.service.fridge;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.boum.frecipe.domain.fridge.Fridge;
import com.boum.frecipe.domain.ingredient.Ingredient;
import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.dto.ingredient.IngredientDTO;
import com.boum.frecipe.repository.fridge.FridgeRepository;
import com.boum.frecipe.repository.ingredient.IngredientRepository;
import com.boum.frecipe.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FridgeServiceImpl implements FridgeService{

	private final UserRepository userRepo;
	private final FridgeRepository fridgeRepo;
	private final IngredientRepository ingRepo;

	// 식품 등록
	@Override
	public List<Ingredient> addIng(String username, List<Ingredient> ingredients) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		for(Ingredient i : ingredients) {
			try {
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
				Date now = new Date();
				Date exp = df.parse(i.getExp());
				// 현재 날짜를 기준으로 유통기한 날짜 까지 남은 일수
				int diff = (int) ((exp.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
				
//				System.out.println("현재 날짜 : " + df.format(now.getTime()));
//				System.out.println("식품 유통기한 : " + df.format(exp.getTime()));
//				System.out.println("날짜 차이 : " + diff);
				
				i.setFridgeNo(user.getFridge().getFridgeNo());
				
				i.setRestExp(diff);
				ingRepo.save(i);
				
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		
		return ingredients;
	}

	// 식품 전체 조회
	@Override
	public Fridge retrieve(String username) {
		this.updateExp();

		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		Fridge fridge = fridgeRepo.findByFridgeNo(user.getFridge().getFridgeNo())
				.orElseThrow(() -> new IllegalArgumentException("해당 회원에게 냉장고가 존재하지 않습니다."));
		
		return fridge;
	}
		
	// 유통기한을 기준으로 식품 7개 조회
	@Override
	public List<Ingredient> retrieveByExp(String username) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));

		List<Ingredient> ingredients = ingRepo.findAllByFridgeNo(user.getFridge().getFridgeNo());
		
		return ingredients;
	}

	// 냉장고 이름 수정
	@Override
	@Transactional
	public Fridge updateFridgeName(String username, String fridgeName) {
		
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));

		Fridge fridge = fridgeRepo.findByFridgeNo(user.getFridge().getFridgeNo())
				.orElseThrow(() -> new IllegalArgumentException("해당 회원에게 냉장고가 존재하지 않습니다."));

		fridge.update(fridgeName);
		return fridge;
	}

	// 식품 삭제
	@Override
	@Transactional
	public void deleteIng(String username, Long ingNo) {
		System.out.println("username : " + username);
		
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		ingRepo.deleteByFridgeNoAndIngNo(user.getFridge().getFridgeNo(), ingNo);
	}
	
	// 전체 식품 삭제
	@Override
	@Transactional
	public void deleteAllIng(String username) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));

		ingRepo.deleteByFridgeNo(user.getFridge().getFridgeNo());
	}
	
	// 남은 기한 갱신
	public void updateExp() {
		List<Ingredient> ingredients = ingRepo.findAll();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		
		for(Ingredient i : ingredients) {
			try {
				Date now = new Date();
				Date exp = df.parse(i.getExp());
				
				int checkDiff = (int) ((exp.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
				
//				System.out.println("저장된 남은 기간 : " + i.getRestExp());
//				System.out.println("현재 남은 기간 : " + checkDiff);
				
				if(i.getRestExp() != checkDiff) {
					i.setRestExp(checkDiff);
					
//					System.out.println("남은 기한 갱신 완료");
					
					ingRepo.save(i);
					continue;
				}
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		
	}
}
