package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


@Entity
public class Relation {
@Id
@GeneratedValue(strategy=GenerationType.AUTO)
private long id;
@ManyToOne
private RegisteredUser user1;
@ManyToOne
private RegisteredUser user2;

private String type;

public long getId() {
	return id;
}

public void setId(long id) {
	this.id = id;
}

public RegisteredUser getUser1() {
	return user1;
}

public void setUser1(RegisteredUser user1) {
	this.user1 = user1;
}

public RegisteredUser getUser2() {
	return user2;
}

public void setUser2(RegisteredUser user2) {
	this.user2 = user2;
}

public String getType() {
	return type;
}

public void setType(String type) {
	this.type = type;
}

public Relation(){
	
}

}
