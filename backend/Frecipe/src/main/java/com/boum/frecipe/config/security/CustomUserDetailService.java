package com.boum.frecipe.config.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.boum.frecipe.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService{

	private final UserRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String userPK){
//		return userRepo.findById(Long.valueOf(userPK)).orElseThrow(CUserNotFoundException);
		return null;
	}

}
