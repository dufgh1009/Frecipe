package com.boum.frecipe.service.recipe;

import java.util.List;

import org.springframework.stereotype.Service;

import com.boum.frecipe.domain.recipe.Recipe;
import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.dto.recipe.RecipeDTO;
import com.boum.frecipe.repository.recipe.RecipeRepository;
import com.boum.frecipe.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

	private final UserRepository userRepo;
	private final RecipeRepository recipeRepo;
	
	// 레시피 등록
	@Override
	public Recipe addRecipe(String username, RecipeDTO recipeDto) {
		
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		Recipe recipe = Recipe.builder()
				.title(recipeDto.getTitle())
				.content(recipeDto.getContent())
				.view(recipeDto.getView())
				.userNo(user.getUserNo())
				.build();
		
		recipeRepo.save(recipe);
		
		return recipe;
	}

	// 나의 레시피 조회
	@Override
	public List<Recipe> retrieveByUserNo(String username) {
		
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		List<Recipe> recipes = recipeRepo.findAllByUserNo(user.getUserNo());
		
		return recipes;
	}

}
