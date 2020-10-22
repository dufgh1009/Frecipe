package com.boum.frecipe.service.user;

import com.boum.frecipe.domain.user.User;

public interface UserService {
	
	// 회원가입
	public User signUp(User user);
	
	// 아이디 찾기
	public User findId(String nickname, String phone);
}
