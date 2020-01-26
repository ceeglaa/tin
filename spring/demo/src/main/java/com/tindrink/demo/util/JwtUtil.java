
package com.tindrink.demo.util;

import java.util.Arrays;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

import com.tindrink.demo.vo.UserVo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
	@Value("${jwt.secret}")
	private String jwtSecret;
	@Value("${jwt.token.validity}")
    private long tokenValidity;
    
	public UserVo getUser(final String token) {
		try {
			Claims body = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
			System.out.println("CLAIMS BODY" + body);
			UserVo user = new UserVo();
			user.setUserName(body.getSubject());
			Set<String> roles = Arrays.asList(body.get("roles").toString().split(",")).stream().map(r -> new String(r))
					.collect(Collectors.toSet());
			user.setRoles(roles);
			return user;
		} catch (Exception e) {
			System.out.println(e.getMessage() + " => " + e);
		}
		return null;
    }
    
	public String generateToken(UserVo u) {

		System.out.println(" GSTUSERNSME IN GENERATE TOKEN ---->>>>" + u.getUserName());
		Claims claims = Jwts.claims().setSubject(u.getUserName());
		claims.put("roles", u.getRoles());
		long nowMillis = System.currentTimeMillis();
		long expMillis = nowMillis + tokenValidity;
		Date exp = new Date(expMillis);
		return Jwts.builder().setClaims(claims).setIssuedAt(new Date(nowMillis)).setExpiration(exp)
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
    }
    
	public void validateToken(final String token) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
		} catch (Exception ex) {
            System.out.println(ex);
		}
	}
}