package com.boum.frecipe.service.recipe;

import java.util.List;

import com.boum.frecipe.domain.recipe.Recipe;
import com.boum.frecipe.dto.recipe.RecipeDTO;

public interface RecipeService {

	// 레시피 등록
	public Recipe addRecipe(String username, RecipeDTO recipeDto);
	
	// 나의 레시피 조회
	public List<Recipe> retrieveByUserNo(String username);
	
	
}
