package com.boum.frecipe.service.recipe;

import java.util.List;

import com.boum.frecipe.domain.recipe.Recipe;
import com.boum.frecipe.dto.recipe.RecipeDTO;

public interface RecipeService {

	// 레시피 등록
	public Recipe addRecipe(String username, RecipeDTO recipeDto);
	
	// 레시피 상세 조회
	public Recipe retrieve(String username, Long recipeNo);
	
	// 전체 레시피 조회
	public List<Recipe> retrieveAll();
	
	// 레시피 수정
	public Recipe update(String username, Long recipeNo, RecipeDTO recipeDto);
	
	// 레시피 삭제
	public void delete(String username, Long recipeNo);
}
	