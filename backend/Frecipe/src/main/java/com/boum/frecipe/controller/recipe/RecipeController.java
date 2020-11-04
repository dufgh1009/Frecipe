package com.boum.frecipe.controller.recipe;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
		@ApiImplicitParam(name = "X-AUTH-TOKEN", required = false, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "레시피 등록")
	@PostMapping
	public ResponseEntity<Recipe> add(@RequestBody RecipeDTO recipeDto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		return new ResponseEntity<Recipe>(service.addRecipe(username, recipeDto), HttpStatus.OK);
	}
	
	// 나의 레시피 조회
	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", required = false, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "나의 레시피 조회")
	@GetMapping
	public ResponseEntity<List<Recipe>> retrieveAll() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		return new ResponseEntity<List<Recipe>>(service.retrieveByUserNo(username), HttpStatus.OK);
	}
}
