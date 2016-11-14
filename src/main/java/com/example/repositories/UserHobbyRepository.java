package com.example.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.UserHobby;

@RepositoryRestResource(path="userhobbies")
public interface UserHobbyRepository extends CrudRepository<UserHobby, Long>{
	
	@Modifying
	@Transactional
	@Query("delete from UserHobby uh where uh.user.id=:user and uh.hobby.id=:hobby")
	public int deleteuserhobby(@Param("user") Long user,@Param("hobby") Long hobby);
}
