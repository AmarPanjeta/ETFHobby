package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.ProfileImage;
import com.example.repositories.ProfileImageRepository;

@Service
public class ImageUploadService {
	@Autowired
	ProfileImageRepository profileImageRepository;
	
	public ProfileImage findByName(String name){
		return profileImageRepository.findByName(name);
	}
	
	public void uploadImage(ProfileImage newImage){
		profileImageRepository.saveAndFlush(newImage);
	}
	
	public ProfileImage findByUsername(String username){
		return profileImageRepository.findByUsername(username);
	}
	
	public void deleteImage(String username){
		profileImageRepository.deleteByUsername(username);
	}
}
