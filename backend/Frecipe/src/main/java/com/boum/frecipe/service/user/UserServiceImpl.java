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
}
