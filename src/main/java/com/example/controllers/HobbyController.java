package com.example.controllers;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Hobby;
import com.example.models.RegisteredUser;
import com.example.models.UserHobby;
import com.example.repositories.HobbyRepository;
import com.example.repositories.UserHobbyRepository;
import com.example.repositories.UserRepository;
import com.example.services.AsyncService;

@RestController
@RequestMapping("/hobbyctrl")
public class HobbyController {
	
	@Autowired
	UserRepository ur;
	
	@Autowired
	HobbyRepository hr;
	
	@Autowired
	UserHobbyRepository uhr;
	
	@Autowired
	AsyncService as;
	
	@RequestMapping("/addhobby")
	public int addhobby(@RequestBody final UserHobbyLink uhl) throws ServletException{
		Hobby hobby=hr.findOne(uhl.hobby);
		RegisteredUser user=ur.findOne(uhl.user);
		if(hobby==null || user==null) throw new ServletException("user or hobby null");
		UserHobby userHobby=new UserHobby();
		userHobby.setHobby(hobby);
		userHobby.setUser(user);
		uhr.save(userHobby);
		as.runCalculations(uhl.user);
		return 1;
	}
	
	@RequestMapping("/delete")
	public int deletehobby(@Param("user")long user,@Param("hobby")long hobby){
		uhr.deleteuserhobby(user, hobby);
		as.runCalculations(user);
		return 1;
	}
	
	
	@SuppressWarnings("unused")
	private static class UserHobbyLink{
		public long hobby;
		public long user;
	}
}
