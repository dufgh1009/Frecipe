package com.boum.frecipe.service.user;

import java.util.List;

import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.dto.user.UserDTO;

public interface UserService {
	
	// 회원가입
	public User signUp(UserDTO userDto);
	
	// 로그인
	public String signIn(String username, String password);
	
	// 전체 회원 조회
	public List<User> retrieveAllUser();
	
	// 회원 상세 조회
	public User retrieveUser(String username);
	
	// 회원 정보 수정
	public User updateUser(String username, UserDTO userDto);
	
	// 회원 탈퇴
	public void deleteUser(String userNo);
}
