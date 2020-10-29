package com.boum.frecipe.dto.user;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	
	private String username;
	private String password;
	private String nickname;
	private String phone;
	private String img;
	private String refName;
	
	public void update(String nickname, String phone, String img) {
		this.nickname = nickname;
		this.phone = phone;
		this.img = img;
	}
}
