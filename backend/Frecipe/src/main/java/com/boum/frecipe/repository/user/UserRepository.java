package com.boum.frecipe.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boum.frecipe.domain.user.User;


public interface UserRepository extends JpaRepository<User, Long>{
	
	// 이메일로 조회
	Optional<User> findByEmail(String email);
	
	// 아이디 찾기
	Optional<User> findByNicknameAndPhone(String nickname, String phone);
}
