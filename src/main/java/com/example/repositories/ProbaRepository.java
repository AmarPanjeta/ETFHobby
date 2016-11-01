package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.proba;

@RepositoryRestResource
public interface ProbaRepository extends CrudRepository<proba, Long>{
	
}
