package com.boum.frecipe.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boum.frecipe.domain.user.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	// 이름으로 조회
	Optional<User> findByUsername(String username);
	
	// 회원번호로 조회
	Optional<User> findByUserNo(Long userNo);
	
	// 아이디 찾기
	Optional<User> findByNicknameAndPhone(String Nickname, String phone);
	
	// 중복 체크
	Boolean existsByUsername(String username);
	
	// 회원 탈퇴
	void deleteByUsername(String username);
}
