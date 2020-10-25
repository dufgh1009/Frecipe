package com.boum.frecipe.service.find;

import com.boum.frecipe.domain.user.User;

public interface FindService {
	
	// 아이디 찾기
	public User findId(String nickname, String phone);
}
