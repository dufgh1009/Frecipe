package com.boum.frecipe.service.comment;

import java.util.List;

import com.boum.frecipe.domain.comment.Comment;
import com.boum.frecipe.dto.comment.CommentDTO;

public interface CommentService {
	
	// 댓글 작성
	public Comment addComment(String username, CommentDTO commentDto);
	
	// 댓글 조회
	public List<Comment> retrieveComment(Long recipeNo);
	
	// 댓글 신고
	public Comment reportComment(String username, Long commentNo);
	
	// 댓글 삭제
	public void deleteComment(String username, Long commentNo);
}
