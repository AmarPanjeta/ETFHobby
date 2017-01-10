package com.example.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Location;

@RepositoryRestResource
public interface LocationRepository extends CrudRepository<Location, Long>{
	
	@Query("select l from Location l where l.user.id=:uid")
	Location getlocationbyuser(@Param("uid")long uid);
	
}
