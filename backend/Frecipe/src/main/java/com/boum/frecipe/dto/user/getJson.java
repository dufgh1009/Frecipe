package com.boum.frecipe.dto.user;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

public class getJson {
	
	public UserDTO parseJson(UserDTO userDto, MultipartFile file) {
		UserDTO dto = new UserDTO();
		
		try {
			ObjectMapper om = new ObjectMapper();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return dto;
	}
}
