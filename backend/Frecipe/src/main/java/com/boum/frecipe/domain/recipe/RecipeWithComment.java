package com.boum.frecipe.domain.recipe;

import java.util.List;

import com.boum.frecipe.domain.comment.Comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeWithComment {
	private Recipe recipe;
	private List<Comment> comments;
}
