package com.boum.frecipe.controller.find;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.dto.user.UserDTO;
import com.boum.frecipe.service.user.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" })
@RestController
@RequiredArgsConstructor
@Api(tags = "FIND")
@RequestMapping("/find")
public class FindController {
	
	private final UserService userService;
	
	@ApiOperation(value = "아이디 찾기", response = String.class)
	@PostMapping("/Id")
	public ResponseEntity<User> findId (@RequestBody UserDTO userDto){
		return new ResponseEntity<User> (userService.findId(userDto.getNickname(), userDto.getPhone()), HttpStatus.OK);
		
	}
}
