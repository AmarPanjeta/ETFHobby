package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.models.Hobby;

public interface HobbyRepository extends CrudRepository<Hobby, Long>{
	
	@Query("select h from Hobby h, RegisteredUser u, UserHobby uh where u.id=:id and uh.user=u and uh.hobby=h")
	public List<Hobby> gethobbiesbyuser(@Param("id")long id);

}
