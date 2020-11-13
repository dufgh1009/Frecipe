package com.boum.frecipe.dto.recipe;

import java.util.List;

import com.boum.frecipe.domain.recipe.Context;
import com.boum.frecipe.domain.recipe.RecipeIng;
import com.boum.frecipe.domain.recipe.RecipeMainIng;
import com.boum.frecipe.domain.recipe.Sauce;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecipeDTO {
	
	private Long recipeNo;
	private String title;
	private List<Context> contexts;
	private String mainImage;
	private List<String> completeImage;
	private List<RecipeMainIng> mainIngredients;
	private List<RecipeIng> ingredients;
	private List<Sauce> sauces;
}
