package com.boum.frecipe.service.recipe;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.boum.frecipe.domain.comment.Comment;
import com.boum.frecipe.domain.recipe.Recipe;
import com.boum.frecipe.domain.recipe.RecipeWithComment;
import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.dto.recipe.RecipeDTO;
import com.boum.frecipe.repository.comment.CommentRepository;
import com.boum.frecipe.repository.recipe.RecipeRepository;
import com.boum.frecipe.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

	private final RecipeRepository recipeRepo;
	private final UserRepository userRepo;
	private final CommentRepository commentRepo;
	
	// 레시피 등록
	@Override
	public Recipe addRecipe(String username, RecipeDTO recipeDto) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		List<Recipe> cnt = recipeRepo.findAll();
		
		Recipe recipe = Recipe.builder()
				.userNo(user.getUserNo())
				.nickname(user.getNickname())
				.title(recipeDto.getTitle())
				.contexts(recipeDto.getContexts())
				.mainImage(recipeDto.getMainImage())
				.completeImage(recipeDto.getCompleteImage())
				.mainIngredients(recipeDto.getMainIngredients())
				.ingredients(recipeDto.getIngredients())
				.sauces(recipeDto.getSauces())
				.view((long) 0)
				.recipeNo(Long.valueOf(cnt.size()+1))
				.build();
		
		recipeRepo.insert(recipe);
		
		return recipe;
	}
	
	// 레시피 상세 조회
	@Override
	public RecipeWithComment retrieve(Long recipeNo) {
		Recipe recipe = recipeRepo.findByRecipeNo(recipeNo)
				.orElseThrow(() -> new IllegalArgumentException("레시피가 존재하지 않습니다."));

		recipe.updateView(recipe.getView()+1);
		recipeRepo.save(recipe);
		
		List<Comment> comment = commentRepo.findByRecipeNo(recipeNo);
		
		RecipeWithComment rwc = RecipeWithComment.builder()
				.recipe(recipe)
				.comment(comment)
				.build();
		
		return rwc;
	}
		
	// 나의 레시피 상세 조회
	@Override
	public Recipe retrieveMine(String username, Long recipeNo) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		Recipe recipe = recipeRepo.findByUserNoAndRecipeNo(user.getUserNo(), recipeNo)
				.orElseThrow(() -> new IllegalArgumentException("레시피가 존재하지 않습니다."));
		return recipe;
	}
	
	// 전체 레시피 조회
	@Override
	public List<RecipeWithComment> retrieveAll() {
		List<Recipe> recipes = recipeRepo.findAll();
		
		List<RecipeWithComment> rwc = new ArrayList<>();
		
		for(Recipe r : recipes) {
			List<Comment> comments = commentRepo.findByRecipeNo(r.getRecipeNo());
			RecipeWithComment temp = RecipeWithComment.builder()
					.recipe(r)
					.comment(comments)
					.build();
			rwc.add(temp);
		}
		return rwc;
	}

	// 레시피 수정
	@Override
	@Transactional
	public Recipe update(String username, RecipeDTO recipeDto) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		Recipe recipe = recipeRepo.findByUserNoAndRecipeNo(user.getUserNo(), recipeDto.getRecipeNo())
				.orElseThrow(() -> new IllegalArgumentException("레시피가 존재하지 않습니다."));
		
		recipe.updateContent(recipeDto.getTitle(), recipeDto.getContexts());
		recipeRepo.save(recipe);
		return recipe;
	}
	
	// 레시피 삭제
	@Override
	@Transactional
	public void delete(String username, Long recipeNo) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		Recipe recipe = recipeRepo.findByUserNoAndRecipeNo(user.getUserNo(), recipeNo)
				.orElseThrow(() -> new IllegalArgumentException("레시피가 존재하지 않습니다."));
		
		recipeRepo.delete(recipe);
	}



	

	

}
