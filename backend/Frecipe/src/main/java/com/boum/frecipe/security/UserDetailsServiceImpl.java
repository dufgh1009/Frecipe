package com.boum.frecipe.security;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.repository.user.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	UserRepository repo;
	
	// client가 입력하는 아이디 값을 받아온다.
	// 'loadUserByUsername'이라고 해서 'username'이라는 변수만 받아오는 줄 알았는데 아니었다..
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("UserDetailsService : " + username);
		User user = repo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		return UserDetailsImpl.build(user);
	}
}
