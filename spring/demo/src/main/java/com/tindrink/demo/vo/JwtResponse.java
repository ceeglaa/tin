package com.tindrink.demo.vo;

import java.util.Set;

public class JwtResponse {

	private String token;
	private Set<String> role;
	private String username;

	public JwtResponse(String token, Set<String> role, String username) {
		this.token = token;
		this.role = role;
		this.username = username;
	}

	public String getToken() {
		return token;
	}

	public Set<String> getRole() {
		return role;
	}

	public String getUsername() {
		return username;
	}
	
}
