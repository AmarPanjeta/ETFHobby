package com.example.controllers;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.RegisteredUser;
import com.example.models.proba;
import com.example.repositories.ProbaRepository;
import com.example.repositories.UserRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/user")
public class UserController {
	private final Map<String, List<String>> userDb=new HashMap<>();
	
	@Autowired
	private ProbaRepository pr;
	
	@Autowired
	private UserRepository ur;
	
	public UserController(){
		userDb.put("opusDei", Arrays.asList("admin"));
		userDb.put("tom", Arrays.asList("admin"));
	}
	
	@RequestMapping("/login")
	public LoginResponse login(@RequestBody final UserData data) throws ServletException{
		
		if(data.username==null/*||!userDb.containsKey(data.username)*/){
			throw new ServletException("Invalid login!");
		}
		
		RegisteredUser user=ur.findFirstByUsernameAndPassword(data.username, data.password);
		
		
		if(user==null) throw new ServletException("Invalid login!");
		
		return new LoginResponse(Jwts.builder().setSubject(data.username)
				.claim("roles", Arrays.asList("user")/*userDb.get(data.username)*/).setIssuedAt(new Date())
				.signWith(SignatureAlgorithm.HS256, "secretkey").compact());
	}
	
	@RequestMapping("/registration")
	public UserData registration(@RequestBody final UserData data) throws ServletException{
		if(ur.findByUsername(data.username)!=null){
			throw new ServletException("Korisnicko ime vec postoji!");
		}
		RegisteredUser newUser=new RegisteredUser();
		newUser.setUsername(data.username);
		newUser.setPassword(data.password);
		newUser.setName(data.name);
		newUser.setSurname(data.surname);
		ur.save(newUser);
		return data;
	}
	

	@SuppressWarnings("unused")
	private static class LoginResponse{
		public String token;
		
		public LoginResponse(final String token){
			this.token=token;
		}
	}
	
	@SuppressWarnings("unused")
	private static class UserData{
		public long id;
		public String username;
		public String password;
		public String name;
		public String surname;
	}
}
