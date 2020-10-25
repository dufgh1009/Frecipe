package com.boum.frecipe.service.find;

import org.springframework.stereotype.Service;

import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FindServiceImpl implements FindService{
	
	private final UserRepository repo;
	// 아이디 찾기
	@Override
	public User findId(String nickname, String phone) {
		return repo.findByNicknameAndPhone(nickname, phone)
				.orElseThrow(() -> new IllegalArgumentException("이름 또는 전화번호가 일치하지 않습니다."));
	}
}
