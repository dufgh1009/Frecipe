package com.boum.frecipe.domain.recipe;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "recipe")
public class Recipe {
	
	// 레시피 번호
	@Id
	private ObjectId recipeNo;
	
	// 제목
	private String title;
	
	// 내용
	private String content;
	
	// 조회수
	private Long view;
	
	// 회원 번호
	@Column(name = "user_no")
	private Long userNo;
}
