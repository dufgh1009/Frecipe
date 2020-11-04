package com.boum.frecipe.service.recipe;

import java.util.List;

import com.boum.frecipe.domain.recipe.Recipe;
import com.boum.frecipe.dto.recipe.RecipeDTO;

public interface RecipeService {

	// 레시피 등록
	public Recipe addRecipe(String username, RecipeDTO recipeDto);
	
	// 레시피 상세 조회
	public Recipe retrieve(String username, String title);
	
	// 전체 레시피 조회
	public List<Recipe> retrieveAll();
}
	