package com.boum.frecipe.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@RequiredArgsConstructor
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{
	
	private final JwtTokenProvider jwtTokenProvider;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.cors()
			.and()
			.httpBasic().disable() // REST API 이므로 기본 설정을 사용하지 않음. 비인증시 로그인 화면으로 리다이렉트
			.csrf().disable() // REST API 이므로 CSRF 보안을 사용하지 않음.
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // JWT 토큰으로 인증하므로 세션은 필요없어 사용하지 않음.
			
			.and()
				.authorizeRequests() // 다음 요청들에 대한 사용 권한 체크
					.requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
					.antMatchers("/users/**", "/find/**").permitAll() // 특정 주소 접근 허용
					.antMatchers(HttpMethod.GET, "/**").permitAll() // 모든 GET 요청 접근 허용
					.anyRequest().hasRole("USER") // 'role'이 'USER'인 데이터만 접근 허용	
					
			.and()
				// JWT 토큰 필터를 ID, PW 인증 필터 전에 넣는다.
				.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
		
	}
	
	@Override
	public void configure(WebSecurity web) { // Swagger에 접근하기 위한 예외 처리
		web.ignoring().antMatchers(
				"/v2/api-docs",
				"/swagger-resources/**",
				"/swagger-ui.html",
				"/webjars/**",
				"/swagger/**"
		);
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.addAllowedOrigin("*");
		configuration.addAllowedHeader("*");
		configuration.addAllowedMethod("*");
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
