package com.boum.frecipe.domain.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {

	// 회원 번호
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_no")
	private Long userNo;
	
	// 이메일
	@Column(nullable = false, unique = true)
	private String email;
	
	@Column(nullable = false)
	// 비밀번호
	private String password;
	
	// 이름
	private String nickname;
	
	// 프로필 사진 url
	private String img;
	
	// 냉장고 이름
	@Column(name = "ref_name")
	private String refName;
}
