package com.boum.frecipe.dto.user;

import com.boum.frecipe.domain.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	
	private String email;
	private String password;
	private String nickname;
	private String phone;
	private String img;
	private String refName;
	
	@Builder
	public UserDTO(User user) {
		this.nickname = user.getNickname();
		this.phone = user.getPhone();
	}
	
}
