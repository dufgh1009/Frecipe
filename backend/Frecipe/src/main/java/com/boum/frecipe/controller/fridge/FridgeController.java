package com.boum.frecipe.controller.fridge;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boum.frecipe.domain.fridge.Fridge;
import com.boum.frecipe.domain.ingredient.Ingredient;
import com.boum.frecipe.dto.fridge.FridgeDTO;
import com.boum.frecipe.dto.ingredient.IngredientDTO;
import com.boum.frecipe.service.fridge.FridgeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" })
@RestController
@Api(tags = "냉장고")
@RequestMapping("/fridges")
@RequiredArgsConstructor
public class FridgeController {

	private final FridgeService service;

	// 식품 등록
	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "식품 등록")
	@PostMapping
	public ResponseEntity<List<Ingredient>> add(@RequestBody List<Ingredient> ingredients) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		return new ResponseEntity<List<Ingredient>>(service.addIng(username, ingredients), HttpStatus.OK);
	}
	
	// 식품 전체 조회
	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "식품 전체 조회")
	@GetMapping
	public ResponseEntity<Fridge> retrieveAll() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		return new ResponseEntity<Fridge>(service.retrieve(username), HttpStatus.OK);
	}
		
	// 유통기한을 기준으로 식품 7개 조회
	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "유통기한을 기준으로 식품 7개 조회")
	@GetMapping("/recommands")
	public ResponseEntity<List<Ingredient>> retrieve() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		return new ResponseEntity<List<Ingredient>>(service.retrieveByExp(username), HttpStatus.OK);
	}

	// 냉장고 이름 수정
	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "냉장고 이름 수정")
	@PutMapping
	public ResponseEntity<Fridge> update(@RequestBody FridgeDTO fridgeDto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		return new ResponseEntity<Fridge>(service.updateFridgeName(username, fridgeDto.getFridgeName()), HttpStatus.OK);
	}

	// 식품 삭제
	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "식품 삭제")
	@DeleteMapping
	public ResponseEntity<Void> delete(@RequestBody IngredientDTO ingredientDto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		
		service.deleteIng(username, ingredientDto);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
