package com.boum.frecipe.service.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.boum.frecipe.exception.CUserNotFoundException;
import com.boum.frecipe.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userJpaRepo;

    public UserDetails loadUserByUsername(String username) {
        return userJpaRepo.findByUsername(username).orElseThrow(CUserNotFoundException::new);
    }
}