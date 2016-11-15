package com.example.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.models.ProfileImage;

public interface ProfileImageRepository extends JpaRepository<ProfileImage, Long>{
	ProfileImage findByName(String name);
	
	@Query("select pi from ProfileImage pi where pi.user.username=:username")
	ProfileImage findByUsername(@Param("username") String username);
	
	@Modifying
	@Transactional
	@Query("delete from ProfileImage pi where pi.id in (select p2.id from ProfileImage p2 where p2.user.username=:username)")
	public int deleteByUsername(@Param("username")String username);
}
