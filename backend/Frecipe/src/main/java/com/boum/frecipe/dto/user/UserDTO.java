package com.boum.frecipe.dto.user;


import java.sql.Blob;

import lombok.AllArgsConstructor;
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
}
