package com.boum.frecipe.config.security;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import com.sun.net.httpserver.HttpServer;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider { // JWT 토큰 생성 및 검증 모듈
	
	@Value("spring.jwt.secret")
	private String secretKey; // 토큰 생성에 사용되는 비밀키
	
	private long tokenValidMilisecond = 1000L * 60 * 60; // 토큰 유효 시간 설정
	
	private final UserDetailsService userDetailsService;
	
	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes()); // 비밀키 생성
	}
	
	// JWT 토큰 생성
	public String createToken(String userPK, List<String> roles) {
		
		// 회원을 구분할 수 있는 값을 세팅하고 토큰이 들어오면 해당 값으로 회원 구분 후 리소스 제공
		Claims claims = Jwts.claims().setSubject(userPK); 
		claims.put("roles", roles);
		
		Date now = new Date();
		
		return Jwts.builder()
				.setClaims(claims) // 회원 구분 데이터
				.setIssuedAt(now) // 토큰 발행일
				.setExpiration(new Date(now.getTime() + tokenValidMilisecond)) // 유효시간
				.signWith(SignatureAlgorithm.HS256, secretKey) // 암호화 알고리즘, 비밀키
				.compact();
	}
	
	// JWT 토큰에서 회원 구분 데이터 추출
	public String getUserPK(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJwt(token).getBody().getSubject();
	}
	
	// JWT 토큰으로 인증 정보 조회
	public Authentication getAuthentication(String token) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPK(token));
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}
	
	// Request의 Header에서 token 파싱 : "X-AUTH-TOKEN: jwt token"
	public String resolveToken(HttpServletRequest req) {
		return req.getHeader("X-AUTH-TOKEN");
	}
	
}
