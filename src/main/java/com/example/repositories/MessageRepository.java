package com.example.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.models.Message;
import com.example.models.Relation;

@RepositoryRestResource(path="messages")
public interface MessageRepository extends PagingAndSortingRepository<Message, Long> {

	@Query("Select m from Message m where m.user1=:id or m.user2=:id")
	public List<Message> getmessagesbyid(@Param("id") long id);
	
	@Query("Select m from Message m where ((m.user1.id=:user1 and m.user2.id=:user2) or (m.user1.id=:user2 and m.user2.id=:user1)) order by m.sendtime asc")
	public List<Message> getmessagesbyusers(@Param("user1") long user1,@Param("user2") long user2,Pageable page);
	
	@Query("Select count(m) from Message m where ((m.user1.id=:user1 and m.user2.id=:user2) or (m.user1.id=:user2 and m.user2.id=:user1)) ")
	public int countmessages(@Param("user1") long user1,@Param("user2") long user2);
	
}
