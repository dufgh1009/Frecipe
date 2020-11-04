package com.boum.frecipe.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.dto.user.UserDTO;
import com.boum.frecipe.service.user.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" })
@RestController
@Api(tags = "회원")
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService service;
	
	@ApiOperation(value = "회원가입")
	@PostMapping
	public ResponseEntity<User> signUp(@RequestBody UserDTO userDto){
		return new ResponseEntity<User>(service.signUp(userDto), HttpStatus.OK);
	}
	
	@ApiOperation(value = "로그인", notes = "로그인 성공시 JWT 토큰 발급")
	@PostMapping(value = "/login")
	public ResponseEntity<String> signIn(@RequestBody UserDTO userDto) {
		return new ResponseEntity<String>(service.signIn(userDto.getUsername(), userDto.getPassword()), HttpStatus.OK);
	}
	
	@ApiOperation(value = "전체 회원 조회")
	@GetMapping()
	public ResponseEntity<List<User>> retrieveAll() {
		return new ResponseEntity<List<User>>(service.retrieveAllUser(), HttpStatus.OK);
	}
	
	@ApiImplicitParams({
        @ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "회원 상세 조회")
	@GetMapping("/details")	
	public ResponseEntity<User> retrieve() {	
		// SecurityContext에서 인증된 회원의 아이디를 가져온다.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        // 결과데이터가 단일건인경우 getSingleResult를 이용해서 결과를 출력한다.
        System.out.println("controller id : " + username);
		return new ResponseEntity<User>(service.retrieveUser(username), HttpStatus.OK);
	}
	
	@ApiImplicitParams({
        @ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "회원 정보 수정")
	@PutMapping
	public ResponseEntity<User> update(@RequestBody UserDTO userDTO) {	
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
		return new ResponseEntity<User>(service.updateUser(username, userDTO), HttpStatus.OK);
	}
	
	@ApiImplicitParams({
        @ApiImplicitParam(name = "X-AUTH-TOKEN", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "회원 탈퇴")
	@DeleteMapping
	public ResponseEntity<Void> delete() {	
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        service.deleteUser(username);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
