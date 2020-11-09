package com.boum.frecipe.repository.comment;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boum.frecipe.domain.comment.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{

	// 댓글 조회 (댓글 번호)
	Optional<Comment> findByCommentNo(Long commentNo);
	
	// 댓글 조회 (레시피 번호)
	List<Comment> findByRecipeNo(Long recipeNo);
}
