package com.boum.frecipe.service.user;

import org.springframework.stereotype.Service;

import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
	
	private final UserRepository userRepo;
	
	// 회원가입
	@Override
	public User signUp(User user) {
		userRepo.save(user);
		return user;
	}
	
	// 아이디 찾기
	@Override
	public User findId(String nickname, String phone) {
		return userRepo.findByNicknameAndPhone(nickname, phone)
				.orElseThrow(() -> new IllegalArgumentException("이름 또는 전화번호가 일치하지 않습니다!"));
	}

	
}
