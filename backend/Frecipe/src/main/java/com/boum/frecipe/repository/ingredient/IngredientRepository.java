package com.boum.frecipe.repository.ingredient;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boum.frecipe.domain.ingredient.Ingredient;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long>{
	
	Optional<Ingredient> findByFridgeNoAndIngName(Long fridgeNo, String ingName);
	
}
