package com.boum.frecipe.service.recipe;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.boum.frecipe.domain.recipe.Recipe;
import com.boum.frecipe.dto.recipe.RecipeDTO;
import com.boum.frecipe.repository.recipe.RecipeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

	private final RecipeRepository recipeRepo;
	
	// 레시피 등록
	@Override
	public Recipe addRecipe(String username, RecipeDTO recipeDto) {
		List<Recipe> cnt = recipeRepo.findAll();
		
		System.out.println("현재 레시피 개수 : " + cnt.size());
		
		Recipe recipe = Recipe.builder()
				.title(recipeDto.getTitle())
				.content(recipeDto.getContent())
				.username(username)
				.view((long) 0)
				.recipeNo(Long.valueOf(cnt.size()+1))
				.build();
		
		System.out.println("레시피 번호 : " + recipe.getRecipeNo());
		recipeRepo.insert(recipe);
		
		List<Recipe> cnt2 = recipeRepo.findAll();
		System.out.println("등록 후 레시피 개수 : " + cnt2.size());
		return recipe;
	}

	// 레시피 이미지 등록
	@Override
	public String uploadImages(String title, MultipartFile image) {
		// TODO Auto-generated method stub
		return null;
	}
	
	// 레시피 상세 조회
	@Override
	public Recipe retrieve(Long recipeNo) {
		Recipe recipe = recipeRepo.findByRecipeNo(recipeNo)
				.orElseThrow(() -> new IllegalArgumentException("레시피가 존재하지 않습니다."));

		recipe.updateView(recipe.getView()+1);
		recipeRepo.save(recipe);
		return recipe;
	}
		
	// 나의 레시피 상세 조회
	@Override
	public Recipe retrieveMine(String username, Long recipeNo) {
		Recipe recipe = recipeRepo.findByUsernameAndRecipeNo(username, recipeNo)
				.orElseThrow(() -> new IllegalArgumentException("레시피가 존재하지 않습니다."));
		
		return recipe;
	}
	
	// 전체 레시피 조회
	@Override
	public List<Recipe> retrieveAll() {
		List<Recipe> recipes = recipeRepo.findAll();
		return recipes;
	}

	// 레시피 수정
	@Override
	@Transactional
	public Recipe update(String username, RecipeDTO recipeDto) {
		Recipe recipe = recipeRepo.findByUsernameAndRecipeNo(username, recipeDto.getRecipeNo())
				.orElseThrow(() -> new IllegalArgumentException("레시피가 존재하지 않습니다."));
		
		recipe.updateContent(recipeDto.getTitle(), recipeDto.getContent());
		recipeRepo.save(recipe);
		return recipe;
	}
	
	// 레시피 삭제
	@Override
	@Transactional
	public void delete(String username, Long recipeNo) {
		Recipe recipe = recipeRepo.findByUsernameAndRecipeNo(username, recipeNo)
				.orElseThrow(() -> new IllegalArgumentException("레시피가 존재하지 않습니다."));
		
		recipeRepo.delete(recipe);
	}



	

	

}
