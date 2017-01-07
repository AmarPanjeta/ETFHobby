package com.example.controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jdbc/")
public class JdbcController {
	
	@Autowired
	JdbcTemplate jdbc;
	
	private Connection con;
	
	
	@RequestMapping("/broj")
	public int broj(@Param("u1")Long u1,@Param("u2")Long u2){
		try {
			con=DriverManager.getConnection("jdbc:postgresql://localhost:5432/dummy","postgres","dbpass");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(con!=null){
			//con.get
		}
		int broj = (int)jdbc.queryForObject(
				"select count(*) from (select hobby_id hobby from user_hobby where user_id=? intersect select hobby_id from user_hobby where user_id=?) int", new Object[] { u1,u2 }, Integer.class);
		return broj;
	}
}
