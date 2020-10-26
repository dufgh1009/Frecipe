package com.boum.frecipe.controller.find;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boum.frecipe.dto.user.UserDTO;
import com.boum.frecipe.service.find.FindService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" })
@RestController
@RequiredArgsConstructor
@Api(tags = "Find")
@RequestMapping("/finds")
public class FindController {
	
	private final FindService service;
	
	@ApiOperation(value = "아이디 찾기", response = String.class)
	@PostMapping("/Id")
	public ResponseEntity<String> findId (@RequestBody UserDTO userDto){
		return new ResponseEntity<String> (service.findId(userDto.getNickname(), userDto.getPhone()), HttpStatus.OK);
		
	}
}
