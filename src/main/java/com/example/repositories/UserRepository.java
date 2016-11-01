package com.example.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.models.RegisteredUser;

@RepositoryRestResource(path="users",collectionResourceRel="users")
public interface UserRepository extends CrudRepository<RegisteredUser, Long> {
	
	
	RegisteredUser findFirstByUsernameAndPassword(@Param("username") String username,@Param("password")String password);
	
	RegisteredUser findByUsername(String username);
	
}
