package com.boum.frecipe.controller.comment;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boum.frecipe.domain.comment.Comment;
import com.boum.frecipe.dto.comment.CommentDTO;
import com.boum.frecipe.service.comment.CommentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" })
@RestController
@Api(tags = "댓글")
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

	private final CommentService service;
	
	@ApiImplicitParams({
        @ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "댓글 작성")
	@PostMapping
	public ResponseEntity<Comment> add(@RequestBody CommentDTO commentDto){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		return new ResponseEntity<Comment>(service.addComment(username, commentDto), HttpStatus.OK);
	}
	
	@ApiOperation(value = "댓글 조회")
	@GetMapping("/{recipeNo}")
	public ResponseEntity<List<Comment>> retrieve(@PathVariable("recipeNo") Long recipeNo){
		return new ResponseEntity<List<Comment>>(service.retrieveComment(recipeNo), HttpStatus.OK);
	}
}
