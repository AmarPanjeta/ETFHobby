package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Nearby;

@RepositoryRestResource
public interface NearbyRepository extends CrudRepository<Nearby, Long>{
	
	@Query("select n from Nearby n where (n.user1.id=:id1 and n.user2.id=:id2) or (n.user1.id=:id2 and n.user2.id=:id1)")
	Nearby getnearbybyusers(@Param("id1")long id1,@Param("id2")long id2);
	
	@Query("select n from Nearby n where n.user1.id=:id or n.user2.id=:id")
	List<Nearby> getnearbiesbyid(@Param("id")long id);
	

	@Query("select n from Nearby n where n.user1.username=:username or n.user2.username=:username")
	List<Nearby> getnearbiesbyusername(@Param("username")String username);
	
}
