package com.example.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Location;

@RepositoryRestResource
public interface LocationRepository extends CrudRepository<Location, Long>{
	
}
