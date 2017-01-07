package com.example.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Location;
import com.example.models.RegisteredUser;
import com.example.repositories.LocationRepository;
import com.example.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/location")
public class LocationController {
	
	@Autowired
	private LocationRepository lr;
	
	@Autowired
	private UserRepository ur;
	
	public LocationController() {
		
	}
	
	@RequestMapping("/update")
	public int locationUpdate(@RequestBody final LocationInput location) throws ServletException{
		Location newLocation = new Location();
		newLocation.setHeight(location.height);
		newLocation.setWidth(location.width);
		
		RegisteredUser user = ur.findOne(location.userId);
		if(user==null){
			throw new ServletException("User ne postoji!");
		}
		newLocation.setUser(user);
		
		lr.save(newLocation);
		
		return 1;
	}
	
	private static final Logger log = LoggerFactory.getLogger(LocationController.class);
	
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
	
	@Scheduled(fixedRate=15000)
	public void reportCurrentTime(){
		log.info("The time is now {}", dateFormat.format(new Date()));
	}
	
	/*
	@Scheduled(fixedRate=150000)
	public void user
	*/ 
	@SuppressWarnings("unused")
	private static class LocationInput{
		public long id;
		public long height;
		public long width;
		public long userId;
	}
}
