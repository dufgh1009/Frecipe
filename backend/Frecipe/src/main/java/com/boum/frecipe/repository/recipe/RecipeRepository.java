package com.boum.frecipe.repository.recipe;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.boum.frecipe.domain.recipe.Recipe;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, ObjectId>{
	
	// 회원 번호로 조회
	List<Recipe> findAllByUserNo(Long userNo);
}
