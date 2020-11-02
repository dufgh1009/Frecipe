package com.boum.frecipe.domain.fridge;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.boum.frecipe.domain.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Fridge {
	
	// 냉장고 번호
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "fridge_no")
	private Long fridgeNo;
	
	// 냉장고 이름
	@Column(name = "fridge_name")
	private String fridgeName;
	
	// 유통기한
	private Date exp;
	
	// 보관 상태 (냉장/냉동)
	private String status;
	
	// 품목
	private String category;
	
	// 설명
	private String description;
	
	// 회원
	@OneToOne(mappedBy = "fridge")
	@JsonIgnore
	private User user;
	
	public void update(String fridgeName) {
		this.fridgeName = fridgeName;
	}
}
