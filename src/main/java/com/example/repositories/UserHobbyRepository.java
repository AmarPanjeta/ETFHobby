package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.UserHobby;

@RepositoryRestResource(path="userhobbies")
public interface UserHobbyRepository extends CrudRepository<UserHobby, Long>{

}
