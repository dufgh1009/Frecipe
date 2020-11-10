package com.boum.frecipe.domain.comment;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

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
	
	// 신고한 댓글
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "comment_no")
	private List<UserReports> userReports;
	
	public void update(Long report) {
		this.report = report;
	}
}
