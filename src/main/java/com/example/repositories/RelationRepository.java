package com.example.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Hobby;
import com.example.models.RegisteredUser;
import com.example.models.Relation;

@RepositoryRestResource(path="relations")
public interface RelationRepository extends CrudRepository<Relation, Long>{

	@Query("Select r from Relation r where r.user1=:id or r.user2=:id")
	public List<Relation> getrelationbyid(@Param("id") long id);
	
	@Query("Select u2 from Relation r,RegisteredUser u1,RegisteredUser u2 where u1.id=:id and ((r.user1=u1 and r.user2=u2) or(r.user2=u1 and r.user1=u2)) and r.type='friends'")
	public List<RegisteredUser> getfriendsbyuserid(@Param("id") long id);
	
	@Modifying
	@Transactional
	@Query("Delete from Relation r where ((r.user1.id=:user1 and r.user2.id=:user2) or (r.user2.id=:user1 and r.user1.id=:user2))")
	public int deleterelation(@Param("user1") Long user1,@Param("user2") Long user2);
	
	@Query("select u from RegisteredUser u WHERE u.id NOT IN (Select u2.id from Relation r,RegisteredUser u1,RegisteredUser u2 where u1.id=:id and ((r.user1=u1 and r.user2=u2) or(r.user2=u1 and r.user1=u2)) and r.type='friends') and u.id<>:id")
	public List<RegisteredUser> getfriendscomplement(@Param("id")long id);
	
	@Query("select u from RegisteredUser u WHERE u.id IN (Select u2.id from Relation r,RegisteredUser u1,RegisteredUser u2 where u1.id=:id and ((r.user1=u1 and r.user2=u2) or(r.user2=u1 and r.user1=u2)) and r.type='Poslan zahtjev')")
	public List<RegisteredUser> getfriendrequests(@Param("id")long id);
	
	@Query("select r.id from Relation r where ((r.user1.id=:user1 and r.user2.id=:user2) or (r.user2.id=:user1 and r.user1.id=:user2))")	
	public Long getrelationidbyusers(@Param("user1") Long user1,@Param("user2") Long user2);
}
