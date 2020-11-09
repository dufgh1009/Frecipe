package com.boum.frecipe.domain.comment;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

	// 댓글 번호
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_no")
	private Long CommentNo;
	
	// 내용
	private String content;
	
	// 평점
	private float rate;
	
	// 신고 횟수
	private Long blind;
	
	// 회원 번호
	@Column(name = "user_no")
	private Long userNo;
}
