package com.boum.frecipe.domain.recipe;

import java.util.List;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.boum.frecipe.domain.ingredient.Ingredient;

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
	
	// 회원 번호
	@Field(name = "user_no")
	private Long userNo;
	
	// 회원 닉네임
	private String nickname;
	
	// 제목
	private String title;
	
	// 내용
	private List<Context> contexts;
	
	// 메인 이미지
	private String mainImage;
	
	// 이미지
	private List<String> completeImage;
	
	// 3가지 메인 재료
	@Field(name = "main_ingredients")
	private List<RecipeMainIng> mainIngredients;
	
	// 재료
	private List<RecipeIng> ingredients;
	
	// 소스
	private List<Sauce> sauces;
	
	// 조회수
	private Long view;
	
	// 평점
	private double rate;
	
	public void updateContent(String title, List<Context> contexts) {
		this.title = title;
		this.contexts = contexts;
	}
	
	public void updateRate(double rate) {
		this.rate = rate;
	}
	
	public void updateView(Long view) {
		this.view = view;
	}
}
