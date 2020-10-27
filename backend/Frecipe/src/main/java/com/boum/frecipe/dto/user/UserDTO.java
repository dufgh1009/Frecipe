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
	
	private String username;
	private String password;
	private String nickname;
	private String phone;
	private String img;
	private String refName;
	
	@Builder
	public UserDTO(User user) {
		this.username = user.getUsername();
		this.phone = user.getPhone();
	}
	
	@Builder
	public UserDTO(String username, String nickname, String password, String phone) {
		this.username = username;
		this.nickname = nickname;
		this.password = password;
		this.phone = phone;
	}
}
