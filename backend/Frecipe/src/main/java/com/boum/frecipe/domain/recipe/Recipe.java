package com.boum.frecipe.domain.recipe;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


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
	@Field(name = "recipe_no")
	private Long recipeNo;
	
	// 회원 아이디
	private String username;
	
	// 제목
	private String title;
	
	// 내용
	private String content;
	
	// 조회수
	private Long view;
	
	// 평점
	private double rate;
	
	public void updateContent(String title, String content) {
		this.title = title;
		this.content = content;
	}
	
	public void updateRate(double rate) {
		this.rate = rate;
	}
	
	public void updateView(Long view) {
		this.view = view;
	}
}
