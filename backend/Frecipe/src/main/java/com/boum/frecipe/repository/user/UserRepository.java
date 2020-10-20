package com.boum.frecipe.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boum.frecipe.domain.user.User;


public interface UserRepository extends JpaRepository<User, Long>{
}
