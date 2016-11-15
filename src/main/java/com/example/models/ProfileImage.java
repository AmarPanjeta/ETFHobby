package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class ProfileImage {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String name;
	private byte[] image;
	private String mimeType;
	
	@ManyToOne
	private RegisteredUser user;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
	public String getMimeType() {
		return mimeType;
	}
	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}	
	public RegisteredUser getUser() {
		return user;
	}
	public void setUser(RegisteredUser user) {
		this.user = user;
	}
	
	public ProfileImage() {
	}	public ProfileImage(String name,byte[] image,String type){
		this.name=name;
		this.image=image;
		this.mimeType=type;
	}
	public ProfileImage(String name,byte[] image,String type,RegisteredUser user){
		this.name=name;
		this.image=image;
		this.mimeType=type;
		this.user=user;
	}
}
