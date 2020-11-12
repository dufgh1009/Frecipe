package com.boum.frecipe.dto.recipe;

import java.util.List;

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
	private String content;
	private List<String> images;
}
