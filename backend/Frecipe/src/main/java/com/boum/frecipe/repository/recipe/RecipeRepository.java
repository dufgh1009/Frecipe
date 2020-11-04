package com.boum.frecipe.repository.recipe;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.boum.frecipe.domain.recipe.Recipe;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String>{
	
	Optional<Recipe> findByUsernameAndTitle(String username, String title);
	
	List<Recipe> findByTitle(String title);
}
