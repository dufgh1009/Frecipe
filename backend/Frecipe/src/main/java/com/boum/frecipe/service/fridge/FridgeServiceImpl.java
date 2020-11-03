package com.boum.frecipe.service.fridge;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

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
	public Ingredient addIng(String username, Ingredient ingredient) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));

		try {
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date now = new Date();
			Date exp = df.parse(ingredient.getExp());

			// 현재 날짜를 기준으로 유통기한 날짜 까지 남은 일수
			long diff = (exp.getTime() - now.getTime()) / (24 * 60 * 60 * 1000) + 2;

			System.out.println("현재 날짜 : " + df.format(now.getTime()));
			System.out.println("식품 유통기한 : " + df.format(exp.getTime()));
			System.out.println("날짜 차이 : " + diff);
			
			ingredient.setFridgeNo(user.getFridge().getFridgeNo());
			ingredient.setExp(String.valueOf(diff));
			ingRepo.save(ingredient);
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return ingredient;
	}

	// 식품 조회
	@Override
	public Fridge retrieveIng(String username) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));

		Fridge fridge = fridgeRepo.findByFridgeNo(user.getFridge().getFridgeNo())
				.orElseThrow(() -> new IllegalArgumentException("해당 회원에게 냉장고가 존재하지 않습니다."));;

		return fridge;
	}

	// 냉장고 이름 수정
	@Override
	@Transactional
	public Fridge updateFridgeName(String username, String fridgeName) {

		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));

		System.out.println("냉장고 수정 회원 : " + user.getUsername());
		System.out.println("수정 냉장고 번호 : " + user.getFridge().getFridgeNo());

		Fridge fridge = fridgeRepo.findByFridgeNo(user.getFridge().getFridgeNo())
				.orElseThrow(() -> new IllegalArgumentException("해당 회원에게 냉장고가 존재하지 않습니다."));

		fridge.update(fridgeName);
		return fridge;
	}

	// 식품 삭제
	@Override
	@Transactional
	public void deleteIng(String username, IngredientDTO ingredientDto) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		System.out.println("식품 삭제 냉장고 : " + user.getFridge().getFridgeNo());
		
		Ingredient ing = ingRepo.findByFridgeNoAndIngName(user.getFridge().getFridgeNo(), ingredientDto.getIngName())
				.orElseThrow(() -> new IllegalArgumentException("식품 이름을 정확히 입력 해주세요."));
		
		System.out.println("삭제 식품 : " + ing);
		
		ingRepo.delete(ing);
	}
}
