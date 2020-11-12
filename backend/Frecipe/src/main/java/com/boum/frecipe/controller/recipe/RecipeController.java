package com.boum.frecipe.controller.recipe;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boum.frecipe.domain.recipe.Recipe;
import com.boum.frecipe.dto.recipe.RecipeDTO;
import com.boum.frecipe.service.recipe.RecipeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/recipes")
@Api(tags = "레시피")
@RequiredArgsConstructor
public class RecipeController {
	
	private final RecipeService service;
	
	// 레시피 등록
	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "레시피 등록")
	@PostMapping
	public ResponseEntity<Recipe> add(@RequestBody RecipeDTO recipeDto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		return new ResponseEntity<Recipe>(service.addRecipe(username, recipeDto), HttpStatus.OK);
	}
	
	// 레시피 이미지 등록
	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "레시피 이미지 등록")
	@PostMapping("/images")
	public ResponseEntity<Recipe> upload(@RequestBody RecipeDTO recipeDto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		return new ResponseEntity<Recipe>(service.addRecipe(username, recipeDto), HttpStatus.OK);
	}
	
	// 레시피 상세 조회
	@ApiOperation(value = "레시피 상세 조회")
	@GetMapping("/{recipeNo}")
	public ResponseEntity<Recipe> retrieve(@PathVariable("recipeNo") Long recipeNo) {
		return new ResponseEntity<Recipe>(service.retrieve(recipeNo), HttpStatus.OK);
	}
	
	// 나의 레시피 상세 조회
	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "나의 레시피 상세 조회")
	@GetMapping("/update/{recipeNo}")
	public ResponseEntity<Recipe> retrieveMine(@PathVariable("recipeNo") Long recipeNo) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		return new ResponseEntity<Recipe>(service.retrieveMine(username, recipeNo), HttpStatus.OK);
	}
	
	// 전체 레시피 조회
	@ApiOperation(value = "전체 레시피 조회")
	@GetMapping
	public ResponseEntity<List<Recipe>> retrieveAll() {
		return new ResponseEntity<List<Recipe>>(service.retrieveAll(), HttpStatus.OK);
	}
	
	// 레시피 수정
	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "레시피 수정")
	@PutMapping()
	public ResponseEntity<Recipe> update(@RequestBody RecipeDTO recipeDto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		return new ResponseEntity<Recipe>(service.update(username, recipeDto), HttpStatus.OK);
	}
		
	// 레시피 삭제
	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "레시피 삭제")
	@DeleteMapping()
	public ResponseEntity<Void> delete(@RequestBody RecipeDTO recipeDto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		
		service.delete(username, recipeDto.getRecipeNo());
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
