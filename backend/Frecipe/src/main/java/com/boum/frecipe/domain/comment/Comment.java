package com.boum.frecipe.domain.comment;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

	// 댓글 번호
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_no")
	private Long commentNo;
	
	// 내용
	private String content;
	
	// 평점
	private float rate;
	
	// 신고 횟수
	private Long report;
	
	// 회원 번호
	@Column(name = "user_no")
	private Long userNo;
	
	// 레시피 번호
	@Column(name = "recipe_no")
	private Long recipeNo;
	
	// 댓글 신고 여부
	@ElementCollection(fetch = FetchType.LAZY)
	@Builder.Default
	private List<Long> reports = new ArrayList<>();
	
	public void update(List<Long> reports, Long report) {
		this.reports = reports;
		this.report = report;
	}
}
