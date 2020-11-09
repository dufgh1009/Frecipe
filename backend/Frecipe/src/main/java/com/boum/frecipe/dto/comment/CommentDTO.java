package com.boum.frecipe.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
	
	// 내용
	private String content;

	// 평점
	private float rate;
	
	// 레시피 번호
	private Long recipeNo;
}
