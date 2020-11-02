package com.boum.frecipe.service.fridge;

import com.boum.frecipe.domain.fridge.Fridge;
import com.boum.frecipe.domain.ingredient.Ingredient;
import com.boum.frecipe.dto.ingredient.IngredientDTO;

public interface FridgeService {
	
	// 식품 등록
	public Ingredient addIng(String username, Ingredient ingredient);

	// 식품 조회
	public Fridge retrieveIng(String username);
	
	// 냉장고 이름 수정
	public Fridge updateFridgeName(String username, String fridgeName);
	
	// 식품 삭제
	public void deleteIng(String username, IngredientDTO ingredientDto);
	
}
