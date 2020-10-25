package com.boum.frecipe.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boum.frecipe.domain.user.User;


public interface UserRepository extends JpaRepository<User, Long>{
	
	// 아이디 중복 확인
	Optional<User> findByUid(String email);
	
	// 아이디 찾기
	Optional<User> findByNicknameAndPhone(String nickname, String phone);
}
