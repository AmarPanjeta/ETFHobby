package com.example;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import com.example.models.Hobby;
import com.example.models.RegisteredUser;
import com.example.models.UserHobby;

@Configuration
public class RepositoryConfig extends RepositoryRestMvcConfiguration{
	
	@Override
	protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		config.exposeIdsFor(RegisteredUser.class);
		config.exposeIdsFor(Hobby.class);
		config.exposeIdsFor(UserHobby.class);
		
	}
}
