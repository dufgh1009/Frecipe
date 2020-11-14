package com.boum.frecipe.domain.ingredient;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Ingredient{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ing_no")
	private Long ingNo;
	
	// 식품 이름
	@Column(name = "ing_name")
	private String ingName;
	
	// 유통기한
	private String exp;

	// 남은 유통기한
	private int restExp;
	
	// 보관 상태 (냉장/냉동)
	private String status;

	// 재고
	private int count;
	
	// 냉장고 번호
	@Column(name = "fridge_no")
	private Long fridgeNo;
}

