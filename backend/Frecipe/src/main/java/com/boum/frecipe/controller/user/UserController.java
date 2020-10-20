package com.boum.frecipe.controller.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.service.user.UserService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" })
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
	
	private final UserService service;
	
	@ApiOperation(value = "회원가입")
	@PostMapping(value = "signUp")
	public ResponseEntity<User> signUp(@RequestBody User user){
		return new ResponseEntity<User>(service.signUp(user), HttpStatus.OK);
	}
}
