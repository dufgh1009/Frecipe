package com.boum.frecipe.service.user;

import java.util.List;

import com.boum.frecipe.domain.user.User;

public interface UserService {
	
	// 회원가입
	public User signUp(User user);
	
	// 로그인
	public String signIn(String email, String password);
	
	// 전체 회원 조회
	public List<User> retrieveAllUser();
	
	// 회원 정보 조회
	public User retrieveUser(String email);
}
