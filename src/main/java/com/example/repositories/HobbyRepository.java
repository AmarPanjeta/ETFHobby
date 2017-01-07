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

/*
 * 
 * select c.c/EXP(SUM(LOG(u.sqrt))) from (select u.id ,(select sqrt(count(*)) from user_hobby where user_id=u.id) as sqrt
from (select * from registered_user where id in (1,2)) u) u,(select count(hobby) c from (select count(hobby_id) hobby from user_hobby group by hobby_id)) c;

*/
