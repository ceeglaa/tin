package com.tindrink.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.tindrink.demo.dao.RoleDAO;
import com.tindrink.demo.dao.UserDAO;
import com.tindrink.demo.entity.Role;
import com.tindrink.demo.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserAuthService implements UserDetailsService {

    
    private UserDAO userDao;
    private RoleDAO roleDao;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserAuthService (UserDAO userDao, PasswordEncoder passwordEncoder, RoleDAO roleDao) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
        this.roleDao = roleDao;
    }
    


    @Override
    @Transactional
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        System.out.println(" USAER AUTH SERVICE UserName --->>>>> " + userName);
		User user = userDao.getUserByUserName(userName);

		if (user == null) {
			throw new UsernameNotFoundException("User '" + userName + "' not found.");
		}

        List<Role> roles = new ArrayList<>();
        roles.add(user.getRole());

        Role role = user.getRole();

        
        GrantedAuthority grantedAuthoritiess = new SimpleGrantedAuthority(role.getName());

		List<GrantedAuthority> grantedAuthorities = roles.stream().map(r -> {
			return new SimpleGrantedAuthority(r.getName());
		}).collect(Collectors.toList());

		return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),
				grantedAuthorities);
	}

    @Transactional
	public void saveUser(User user) {

        Role role = roleDao.getRoleByName("USER");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(role);

		userDao.save(user);
	}

}
