package com.boum.frecipe.service.comment;

import java.util.List;

import org.springframework.stereotype.Service;

import com.boum.frecipe.domain.comment.Comment;
import com.boum.frecipe.domain.recipe.Recipe;
import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.dto.comment.CommentDTO;
import com.boum.frecipe.repository.comment.CommentRepository;
import com.boum.frecipe.repository.recipe.RecipeRepository;
import com.boum.frecipe.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

	private final UserRepository userRepo;
	private final CommentRepository commentRepo;
	private final RecipeRepository recipeRepo;
	
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
				.build();
		
		commentRepo.save(comment);
		
		Recipe recipe = recipeRepo.findByRecipeNo(commentDto.getRecipeNo())
				.orElseThrow(() -> new IllegalArgumentException("레시피가 존재하지 않습니다."));
		
		System.out.println("레시피 : " + recipe);
		System.out.println("계산 전 레시피 평점 : " + recipe.getRate());
		
		List<Comment> comments = commentRepo.findByRecipeNo(commentDto.getRecipeNo());
		
		// 레시피 총 평점 계산
		float totalRate = 0;
		for(Comment c : comments) {
			totalRate += c.getRate();
		}
		System.out.println("레시피 총 평점 : " + totalRate);
		// 레시피 평점 계산
		float avgRate = totalRate / comments.size();
		
		// 레시피 평점 갱신
		recipe.updateRate(avgRate);
		
		System.out.println("계산 후 레시피 평점 : " + avgRate);
		
		return comment;
	}

}
