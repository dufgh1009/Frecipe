package com.boum.frecipe.config.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

public class JwtAuthenticationFilter extends GenericFilterBean{ // JWT가 유요한 토큰인지 인증하기 위한 Filter

	private JwtTokenProvider jwtTokenProvider;
	
	// JWT Provider 주입
	public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
		this.jwtTokenProvider = jwtTokenProvider;
	}
	
	// req로 들어오는 JWT 토큰의 유효성을 검증(jWtTokenProvider.vaildateToken)하는 filter를 filterChain에 등록
	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain) throws IOException, ServletException {
		String token = jwtTokenProvider.resolveToken((HttpServletRequest) req);
		
		if(token != null && jwtTokenProvider.validateToken(token)) {
			Authentication auth = jwtTokenProvider.getAuthentication(token);
			SecurityContextHolder.getContext().setAuthentication(auth);
		}
		
		filterChain.doFilter(req, res);
	} 

}
