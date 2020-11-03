package com.boum.frecipe.repository.ingredient;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.boum.frecipe.domain.ingredient.Ingredient;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long>{
	
	Optional<Ingredient> findByFridgeNoAndIngName(Long fridgeNo, String ingName);
	
	@Query(value = "DELETE "
						 + "FROM INGREDIENT "
						 + "WHERE fridge_no = :fridgeNo "
						   + "AND ing_name = :ingName", nativeQuery = true)
	void deleteByFridgeNoAndIngName(@Param("fridgeNo")Long fridgeNo, @Param("ingName")String ingName);
}
