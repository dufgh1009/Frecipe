package com.boum.frecipe.repository.ingredient;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boum.frecipe.domain.ingredient.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Long>{

}
