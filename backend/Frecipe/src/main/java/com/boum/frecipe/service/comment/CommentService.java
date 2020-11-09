package com.boum.frecipe.service.comment;

import com.boum.frecipe.domain.comment.Comment;
import com.boum.frecipe.dto.comment.CommentDTO;

public interface CommentService {
	
	// 댓글 작성
	public Comment addComment(String username, CommentDTO commentDto);
}
