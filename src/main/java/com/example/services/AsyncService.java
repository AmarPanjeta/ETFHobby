package com.example.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Vector;
import java.util.concurrent.Future;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.models.Hobby;
import com.example.models.RegisteredUser;
import com.example.models.Similarity;
import com.example.repositories.HobbyRepository;
import com.example.repositories.SimilarityRepository;
import com.example.repositories.UserRepository;

@Service
public class AsyncService {
	
	private static final Logger logger = LoggerFactory.getLogger(AsyncService.class);
	
	@Autowired
	private UserRepository ur;
	
	@Autowired
	private HobbyRepository hr;
	
	@Autowired
	private SimilarityRepository sr;
	
	private Connection con;
	
	public AsyncService(){
		System.out.println("instanciran async service");
		try {
			con=DriverManager.getConnection("jdbc:postgresql://localhost:5432/test","postgres","dbpass");
			System.out.println("imamo konekciju!");
		} catch (SQLException e) {
			
		 	e.printStackTrace();
		}
	}
	
	@Async
	public Future<Boolean> runCalculations(long userId){
		Date startTime = new Date();
		double percentage;
		logger.info("Pocinje racunanje");
		RegisteredUser u=ur.findOne(userId);
		if(u==null) return new AsyncResult<Boolean>(false);
		List<RegisteredUser> users=(List<RegisteredUser>) ur.findAll();
		for(int i=0;i<users.size();i++){
			logger.info(users.get(i).getUsername());
			try {
				
				Similarity s=sr.getusersimilarity(userId, users.get(i).getId());
				if(s==null){
					percentage=cosineSimilarity(userId, users.get(i).getId());
					s=new Similarity();
					s.setUser1(u);
					s.setUser2(users.get(i));
					s.setPercentage(percentage);
					sr.save(s);
					logger.info(Double.toString(percentage));
				}
				else{
					if(s.getUpdated().before(startTime)){
						percentage=cosineSimilarity(userId, users.get(i).getId());
						s.setUpdated(new Date());
						s.setPercentage(percentage);
						sr.save(s);
						logger.info(Double.toString(percentage));
					}
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		logger.info("Racunanje gotovo!");
		return new AsyncResult<>(true);
	}
	
	private double cosineSimilarity(long u1,long u2) throws SQLException{
		List<Hobby> hobbies1=hr.gethobbiesbyuser(u1);
		List<Hobby> hobbies2=hr.gethobbiesbyuser(u2);
		if(hobbies1.isEmpty() || hobbies2.isEmpty()) return 0;
		
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
		return 0;
	}
}
