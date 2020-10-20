package com.boum.frecipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boum.frecipe.domain.User;

public interface UserRepository extends JpaRepository<User, Long>{
}
