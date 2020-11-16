package com.boum.frecipe.domain.fridge;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.boum.frecipe.domain.ingredient.Ingredient;
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
	
	// 회원
	@OneToOne(mappedBy = "fridge")
	@JsonIgnore
	private User user;
	
	// 재료
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "fridge_no")
	private Set<Ingredient> ingredient;
	
	// 냉장고 이름 수정
	public void update(String fridgeName) {
		this.fridgeName = fridgeName;
	}
}
