package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.models.ProfileImage;

public interface ProfileImageRepository extends JpaRepository<ProfileImage, Long>{
	ProfileImage findByName(String name);
	
	@Query("select pi from ProfileImage pi where pi.user.username=:username")
	ProfileImage findByUsername(@Param("username") String username);
	
}
