package com.boum.frecipe.controller.user;

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

import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.service.user.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" })
@RestController
@RequiredArgsConstructor
@Api(tags = "User")
@RequestMapping("/users")
public class UserController {
	
	private final UserService service;
	
	@ApiOperation(value = "회원가입")
	@PostMapping
	public ResponseEntity<User> signUp(@RequestBody User user){
		return new ResponseEntity<User>(service.signUp(user), HttpStatus.OK);
	}
	
	@ApiOperation(value = "로그인", notes = "로그인 성공시 JWT 토큰 발급")
	@PostMapping(value = "/login")
	public ResponseEntity<String> signIn(@RequestBody User user){
		return new ResponseEntity<String>(service.signIn(user.getEmail(), user.getPassword()), HttpStatus.OK);
	}
	
	@ApiOperation(value = "전체 회원 조회")
	@GetMapping()
	public ResponseEntity<List<User>> retrieveAll() {
		return new ResponseEntity<List<User>>(service.retrieveAllUser(), HttpStatus.OK);
	}
	
	@ApiOperation(value = "회원 정보 조회")
	@GetMapping("/details")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH_TOKEN", value = "로그인 후 발급된 JWT 토큰", required = true, dataType = "String", paramType = "header")
	})
	public ResponseEntity<User> retrieve() {
		// SecurityContext에서 인증받은 회원의 정보를 얻어온다.	
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("현재 인증 정보 : " + auth);
		String email = auth.getName();
		return new ResponseEntity<User>(service.retrieveUser(email), HttpStatus.OK);
	}
}
