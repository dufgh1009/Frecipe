package com.boum.frecipe.domain.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails{

	private static final long serialVersionUID = 1L;

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
	
	// 전화번호
	private String phone;
	
	// 프로필 사진 url
	private String img;
	
	// 냉장고 이름
	@Column(name = "ref_name")
	private String refName;
	
	@ElementCollection(fetch = FetchType.EAGER)
	@Builder.Default
	private List<String> roles = new ArrayList<>();
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
	}
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public String getUsername() { // Security에서 사용하는 회원 구분 ID
		return this.email;
	}
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isAccountNonExpired() { // 계정 만료 여부
		return true;
	}
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isAccountNonLocked() { // 계정 잠김 여부
		return true;
	}
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isCredentialsNonExpired() { // 패스워드 만료 여부
		return true;
	}
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isEnabled() { // 계정 사용가능 여부
		return true;
	}
}
