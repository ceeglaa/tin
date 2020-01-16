package com.tindrink.demo.rest;

import java.util.Set;
import java.util.stream.Collectors;

import com.tindrink.demo.dao.RoleDAO;
import com.tindrink.demo.entity.Role;
import com.tindrink.demo.entity.User;
import com.tindrink.demo.util.*;
import com.tindrink.demo.vo.UserVo;
import com.tindrink.demo.service.UserAuthService;
import com.tindrink.demo.vo.JwtRequest;
import com.tindrink.demo.vo.JwtResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
public class JwtRestController {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserAuthService userAuthService;

	@Autowired
	private AuthenticationManager authenticationManager;
	
	private RoleDAO roleDao;
    
    public JwtRestController (JwtUtil jwtUtil, UserAuthService userAuthService, AuthenticationManager authenticationManager, RoleDAO roleDao){
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
		this.userAuthService = userAuthService;
		this.roleDao = roleDao;
    }

	@PostMapping("/signin")
	public ResponseEntity<JwtResponse> generateJwtToken(@RequestBody JwtRequest jwtRequest) {

		System.out.println(" JWT REQUEST " + jwtRequest.getUserName() + "   " + jwtRequest.getPassword() );

		try {
			Authentication authentication = 
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(jwtRequest.getUserName(), jwtRequest.getPassword()));
					UserDetails userDetailst = (UserDetails) authentication.getPrincipal();
					System.out.println(" USER DETAIL Z PRINCITATE ------>>>>>>" + userDetailst);
		} catch (DisabledException e) {
			throw new RuntimeException("User Inactive");
		} catch (BadCredentialsException e) {
			throw new RuntimeException("Invalid Credentials");
		} catch (AuthenticationException e) {
			System.out.println(" CATCH EXCEPTION +++ ---- >>>" + e);
			throw new RuntimeException(e);
		}

		System.out.println(" JESTESMY ZA AUTHENTYKACJA");

		

		UserDetails userDetails = userAuthService.loadUserByUsername(jwtRequest.getUserName());

		String username = userDetails.getUsername();
		String userpwd = userDetails.getPassword();
		Set<String> roles = userDetails.getAuthorities().stream().map(r -> r.getAuthority())
				.collect(Collectors.toSet());

		UserVo user = new UserVo();
		user.setUserName(username);
		user.setPassword(userpwd);
		user.setRoles(roles);

		String token = jwtUtil.generateToken(user);

		return new ResponseEntity<JwtResponse>(new JwtResponse(token, roles, username), HttpStatus.OK);
	}

	@PostMapping("/signup")
	public ResponseEntity<String> signup(@RequestBody User user) {

		try{
			userAuthService.saveUser(user);
			return new ResponseEntity<String>("User " + user.getUserName() + " został zarejestrowny", HttpStatus.OK);
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<String>("Username " + user.getUserName() + " juz istnieje", HttpStatus.CONFLICT);
		}

	}

	@PostMapping("/role")
	public ResponseEntity<String> signup(@RequestBody Role role) {
		roleDao.save(role);
		return new ResponseEntity<String>("User successfully registered", HttpStatus.OK);
	}

}
