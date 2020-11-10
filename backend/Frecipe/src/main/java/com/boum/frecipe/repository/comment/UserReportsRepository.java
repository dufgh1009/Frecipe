package com.boum.frecipe.repository.comment;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boum.frecipe.domain.comment.UserReports;

public interface UserReportsRepository extends JpaRepository<UserReports, Long>{

	Optional<UserReports> findByUserNoAndCommentNo(Long userNo, Long commentNo);
	
}
