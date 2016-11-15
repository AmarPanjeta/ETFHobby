package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.models.ProfileImage;

public interface ProfileImageRepository extends JpaRepository<ProfileImage, Long>{
	ProfileImage findByName(String name);
}
