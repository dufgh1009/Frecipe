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

	// 유통기한을 기준으로 식품 7개 조회
	@Query(value = "SELECT * "
				   + "FROM ingredient "
				   + "WHERE rest_exp > 0 "
				   + "AND fridge_no = :fridgeNo "
				   + "ORDER BY rest_exp "
				   + "LIMIT 7 "
				   , nativeQuery = true)
	List<Ingredient> findAllByFridgeNo(@Param("fridgeNo")Long fridgeNo);
	
	// 식품 조회 (냉장고 번호)
	List<Ingredient> findByFridgeNo(Long fridgeNo);
	
	// 식품 조회 (냉장고 번호, 식품 번호)
	Optional<Ingredient> findByFridgeNoAndIngNo(Long fridgeNo, Long ingNo);
	
	// 식품 삭제
	@Query(value = "DELETE "
					+ "FROM INGREDIENT "
					+ "WHERE fridge_no = :fridgeNo "
					+ "AND ing_no = :ingNo "
					, nativeQuery = true)
	void deleteByFridgeNoAndIngNo(@Param("fridgeNo")Long fridgeNo, @Param("ingNo")String ingNo);

	// 전체 식품 삭제
	@Query(value = "DELETE "
					+ "FROM INGREDIENT "
					+ "WHERE fridge_no = :fridgeNo "
					, nativeQuery = true)
	void deleteByFridgeNo(Long fridgeNo);
}
