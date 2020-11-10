package com.boum.frecipe.service.comment;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.boum.frecipe.domain.comment.Comment;
import com.boum.frecipe.domain.comment.UserReports;
import com.boum.frecipe.domain.recipe.Recipe;
import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.dto.comment.CommentDTO;
import com.boum.frecipe.repository.comment.CommentRepository;
import com.boum.frecipe.repository.comment.UserReportsRepository;
import com.boum.frecipe.repository.recipe.RecipeRepository;
import com.boum.frecipe.repository.user.UserRepository;

import lombok.Builder;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

	private final UserRepository userRepo;
	private final CommentRepository commentRepo;
	private final RecipeRepository recipeRepo;
	private final UserReportsRepository userReportRepo;
	
	// 댓글 작성
	@Override
	public Comment addComment(String username, CommentDTO commentDto) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		Comment comment = Comment.builder()
				.content(commentDto.getContent())
				.rate(commentDto.getRate())
				.userNo(user.getUserNo())
				.recipeNo(commentDto.getRecipeNo())
				.report((long) 0)
				.build();
		
		commentRepo.save(comment);
		
		Recipe recipe = recipeRepo.findByRecipeNo(commentDto.getRecipeNo())
				.orElseThrow(() -> new IllegalArgumentException("레시피가 존재하지 않습니다."));
		
		List<Comment> comments = commentRepo.findByRecipeNo(commentDto.getRecipeNo());
		
		// 레시피 총 평점 계산
		double totalRate = 0;
		for(Comment c : comments) {
			totalRate += c.getRate();
		}
		
		// 레시피 평점 계산
		double avgRate = totalRate / comments.size();
		
		// 레시피 평점 갱신
		recipe.updateRate(Math.round(avgRate*10) / 10.0);
		recipeRepo.save(recipe);
		
		return comment;
	}

	// 댓글 조회
	@Override
	public List<Comment> retrieveComment(Long recipeNo) {
		List<Comment> comments = commentRepo.findByRecipeNo(recipeNo);
		return comments;
	}

	// 댓글 신고
	@Override
	@Transactional
	public Comment reportComment(String username, Long commentNo) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		Optional<UserReports> checkReport = userReportRepo.findByUserNoAndCommentNo(user.getUserNo(), commentNo);
		
		if(checkReport.isPresent()) {
			throw new IllegalArgumentException("이미 신고한 댓글입니다.");
		}
		
		Comment comment = commentRepo.findByCommentNo(commentNo)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다."));
		
		comment.update(comment.getReport()+1);
		
		UserReports userReport = UserReports.builder()
				.commentNo(commentNo)
				.userNo(user.getUserNo())
				.build();
		
		userReportRepo.save(userReport);
		
		return comment;
	}

	// 댓글 삭제
	@Override
	@Transactional
	public void deleteComment(String username, Long commentNo) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		Comment comment = commentRepo.findByUserNoAndCommentNo(user.getUserNo(), commentNo)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다."));
		
		commentRepo.delete(comment);
	}

}
