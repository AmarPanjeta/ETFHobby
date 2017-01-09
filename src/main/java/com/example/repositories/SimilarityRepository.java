package com.example.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Similarity;

@RepositoryRestResource
public interface SimilarityRepository extends CrudRepository<Similarity, Long>{
	
	@Query("select s from Similarity s where (s.user1.id=:id1 and s.user2.id=:id2) or (s.user2.id=:id1 and s.user1.id=:id2)")
	Similarity getusersimilarity(@Param("id1")long id1,@Param("id2")long id2);
}
