package com.boum.frecipe.repository.recipe;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.boum.frecipe.domain.recipe.Recipe;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String>{
	
	// 레시피 상세 조회 (레시피 번호)
	Optional<Recipe> findByRecipeNo(Long recipeNo);
	
	// 레시피 상세 조회 (회원 번호, 레시피 번호)
	Optional<Recipe> findByUserNoAndRecipeNo(Long userNo, Long recipeNo);
	
	
}
