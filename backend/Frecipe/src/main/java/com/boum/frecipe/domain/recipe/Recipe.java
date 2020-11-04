package com.boum.frecipe.domain.recipe;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Document("recipe")
@Getter
@Setter
@Builder
public class Recipe {
	
	// 레시피 ID
	@Id
	private String _id;
	
	// 레시피 번호
	private Long recipeNo;
	
	// 회원 아이디
	private String username;
	
	// 제목
	private String title;
	
	// 내용
	private String content;
	
	// 조회수
	private Long view;
	
}
