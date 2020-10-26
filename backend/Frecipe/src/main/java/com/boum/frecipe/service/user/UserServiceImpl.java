package com.boum.frecipe.service.user;

import java.util.Collections;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.boum.frecipe.config.security.JwtTokenProvider;
import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.dto.user.UserDTO;
import com.boum.frecipe.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
	
	private final UserRepository repo;
	private final JwtTokenProvider jwtTokenProvider;
	private final PasswordEncoder passwordEncoder;
	
	// 회원가입
	@Override
	public User signUp(UserDTO userDto) {
		
		User user = User.builder()
				.email(userDto.getEmail())
				.password(passwordEncoder.encode(userDto.getPassword()))
				.nickname(userDto.getNickname())
				.phone(userDto.getPhone())
				.roles(Collections.singletonList("ROLE_USER"))
				.build();
		
		repo.save(user);
		return user;
	}
	
	// 로그인
	@Override
	public String signIn(String email, String password) {
		User user = repo.findByEmail(email)
				.orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		
		if(!passwordEncoder.matches(password, user.getPassword())) {
			throw new IllegalArgumentException("비밀번호를 확인 해주세요.");
		}
		
		System.out.println("로그인 user : " + user);
		return jwtTokenProvider.createToken(String.valueOf(user.getUserNo()), user.getRoles());
	}

	// 전체 회원 조회
	@Override
	public List<User> retrieveAllUser() {
		return repo.findAll();
	}
	
	// 회원 정보 조회
	@Override
	public User retrieveUser(String email) {
		return repo.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
	}
	
}
