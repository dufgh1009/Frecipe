package com.boum.frecipe.controller.user;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	@PutMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<User> update(
			@RequestPart("userDto") @Valid UserDTO userDto, 
			@RequestPart("img") @Valid MultipartFile img) {	
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        Map<String, Object> param = new HashMap<String, Object>();
        
        String imgName = img.getOriginalFilename();
        
        byte[] bytes;
        Blob blob = null;
        
        try {
			bytes = img.getBytes();
			try {
				blob = new SerialBlob(bytes);
				param.put("img", blob);
				param.put("img_name", imgName);
				param.put("img_size", blob.length());
			} catch (SerialException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
        
		return new ResponseEntity<User>(service.updateUser(username, userDto, blob), HttpStatus.OK);
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
