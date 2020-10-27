package com.boum.frecipe.service.user;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.boum.frecipe.domain.user.ERole;
import com.boum.frecipe.domain.user.Role;
import com.boum.frecipe.domain.user.User;
import com.boum.frecipe.dto.user.UserDTO;
import com.boum.frecipe.repository.user.RoleRepository;
import com.boum.frecipe.repository.user.UserRepository;
import com.boum.frecipe.security.JwtUtils;
import com.boum.frecipe.security.UserDetailsImpl;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	RoleRepository roleRepo;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
	PasswordEncoder encoder;
	
	// 회원가입
	@Override
	public User signUp(UserDTO userDto) {
		
		if (userRepo.existsByUsername(userDto.getUsername())) {
			throw new IllegalArgumentException("이미 존재하는 이메일 입니다.");
		}

		User user = User.builder()
				.username(userDto.getUsername())
				.password(encoder.encode(userDto.getPassword()))
				.nickname(userDto.getNickname())
				.phone(userDto.getPhone())
				.build();
				
		Set<Role> roles = new HashSet<>();
		
		Role userRole = roleRepo.findByName(ERole.ROLE_USER)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		roles.add(userRole);
		
		user.setRoles(roles);
		userRepo.save(user);
		return user;
	}
	
	// 로그인
	@Override
	public String signIn(String username, String password) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(username, password));
		
		System.out.println("auth : " + authentication);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		System.out.println("jwt : " + jwt);
		
		// loadByUsername을 통해 입력한 값을 찾아 반환
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		System.out.println("userNo : " + userDetails.getUserNo());
		System.out.println("username : " + userDetails.getUsername());
		return jwt;
	}

	// 전체 회원 조회
	@Override
	public List<User> retrieveAllUser() {
		return userRepo.findAll();
	}
	
	// 회원 정보 조회
	@Override
	public User retrieveUser(String username) {
		return userRepo.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
	}
	
}
