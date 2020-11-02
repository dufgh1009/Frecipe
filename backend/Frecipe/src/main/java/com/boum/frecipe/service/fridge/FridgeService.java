package com.boum.frecipe.service.fridge;

import com.boum.frecipe.domain.fridge.Fridge;
import com.boum.frecipe.domain.ingredient.Ingredient;

public interface FridgeService {
	
	// 식품 조회
	public Fridge retrieveIng(String username);
	
	// 식품 등록
	public Ingredient addIng(String username, Ingredient ingredient);
	
	// 냉장고 이름 수정
	public Fridge update(String username, String fridgeName);
	
}
