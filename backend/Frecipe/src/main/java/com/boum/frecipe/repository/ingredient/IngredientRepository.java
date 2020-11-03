package com.boum.frecipe.repository.ingredient;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.boum.frecipe.domain.ingredient.Ingredient;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long>{

	// 냉장고에 있는 식품 조회
	@Query(value = "SELECT * "
				   + "FROM ingredient "
				   + "WHERE CAST(`exp` as signed) > 0 "
				   + "ORDER BY CAST(`exp` as signed) "
				   + "LIMIT 7 "
				   , nativeQuery = true)
	List<Ingredient> findAllByFridgeNo(Long fridgeNo);
	
	// 냉장고 번호와 식품 이름으로 찾기
	Optional<Ingredient> findByFridgeNoAndIngName(Long fridgeNo, String ingName);
	
	// 식품 삭제
	@Query(value = "DELETE "
					+ "FROM INGREDIENT "
					+ "WHERE fridge_no = :fridgeNo "
					+ "AND ing_name = :ingName "
					, nativeQuery = true)
	void deleteByFridgeNoAndIngName(@Param("fridgeNo")Long fridgeNo, @Param("ingName")String ingName);


}
