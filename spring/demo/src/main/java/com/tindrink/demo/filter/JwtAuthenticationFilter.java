package com.tindrink.demo.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tindrink.demo.service.UserAuthService;
import com.tindrink.demo.util.JwtUtil;
import com.tindrink.demo.vo.UserVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    UserAuthService userAuthService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

            System.out.println(" REQUEST ++++---->>>>" + request.getMethod()  + "  " + request.getRequestURI());
        String header = request.getHeader("Authorization");

        System.out.println(" HEADER --->>>> " + header);

        if( header == null || !header.startsWith("Bearer")) {
            throw new RuntimeException("No JWT token found in the request headers");
        }

        String token = header.substring(7);

        System.out.println("TOKEN --->>>  " + token );

        UserVo userVo = jwtUtil.getUser(token);

        System.out.println(" USER VO GET BY TOKEN    ---->>>>> "  + userVo.getUserName());

        UserDetails userDetails = userAuthService.loadUserByUsername(userVo.getUserName());

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());

        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }

        filterChain.doFilter(request, response);
    }
    
}