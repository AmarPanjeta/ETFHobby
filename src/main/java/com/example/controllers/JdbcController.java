package com.example.controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.RegisteredUser;
import com.example.repositories.UserRepository;

@RestController
@RequestMapping("/jdbc/")
public class JdbcController {
	
	@Autowired
	JdbcTemplate jdbc;
	
	@Autowired
	UserRepository ur;

	private Connection con;
	
	public JdbcController() {
		try {
			con=DriverManager.getConnection("jdbc:postgresql://localhost:5432/test","postgres","dbpass");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
		 	e.printStackTrace();
		}
	}
	
	@RequestMapping("/similarityid")
	public double similarityById(@Param("u1")Long u1,@Param("u2")Long u2) throws SQLException,ServletException{
		if(con!=null){
			PreparedStatement p= con.prepareStatement("select q1.brojhobija/q3.djelilac from (select count(*) brojhobija from (select hobby_id hobby from user_hobby where user_id=? intersect select hobby_id from user_hobby where user_id=?) int) q1,"
					+ "(select EXP(SUM(LN(q2.sqrt))) djelilac from (select sqrt(count(*)) as sqrt from user_hobby where user_id in (?,?) group by user_id) q2)q3");
			p.setLong(1, u1);
			p.setLong(2, u2);
			p.setLong(3, u1);
			p.setLong(4, u2);
			ResultSet rs=p.executeQuery();
			rs.next();
			return rs.getDouble(1);
		}
		else throw new ServletException("Dbase connection error!");
	}
	
	@RequestMapping("similarityusname")
	public double similarityByUsername(@Param("uname1") String uname1,@Param("uname2")String uname2) throws SQLException,ServletException{
		RegisteredUser u1=ur.findByUsername(uname1);
		RegisteredUser u2=ur.findByUsername(uname2);
		
		return similarityById(u1.getId(), u2.getId());
	}
	
	@Scheduled(/*fixedRate=300000*/ fixedDelay=10000)
	public void deleteOldLocations(){
		System.out.println("yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay");
		if(con!=null){
			try {
				Statement s=con.createStatement();
				s.executeUpdate("DELETE from location where extract (epoch from(CURRENT_TIMESTAMP-updated::timestamp))::integer/60>5");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
	}
}
