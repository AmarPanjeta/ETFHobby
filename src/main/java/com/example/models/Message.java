package com.example.models;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Message {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	@ManyToOne
	private RegisteredUser user1;
	
	@ManyToOne
	private RegisteredUser user2;
	
	private String status;
	
	private String context;
	
	@Basic(optional=false)
	@Column(insertable=false,columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date sendtime;

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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getContext() {
		return context;
	}

	public void setContext(String context) {
		this.context = context;
	}

	public Date getSendtime() {
		return sendtime;
	}

	public void setSendtime(Date sendtime) {
		this.sendtime = sendtime;
	}
	
	public Message(){
		
	}
	
}
