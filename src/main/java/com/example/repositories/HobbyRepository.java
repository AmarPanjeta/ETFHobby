package com.example.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.models.Hobby;

public interface HobbyRepository extends CrudRepository<Hobby, Long>{

}
