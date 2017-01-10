package com.example.controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Location;
import com.example.models.Nearby;
import com.example.models.RegisteredUser;
import com.example.models.Similarity;
import com.example.repositories.LocationRepository;
import com.example.repositories.NearbyRepository;
import com.example.repositories.SimilarityRepository;
import com.example.repositories.UserRepository;

@RestController
@RequestMapping("/jdbc/")
public class JdbcController {
	
	@Autowired
	JdbcTemplate jdbc;
	
	@Autowired
	UserRepository ur;
	
	@Autowired
	LocationRepository lr;
	
	@Autowired
	SimilarityRepository sr;
	
	@Autowired
	NearbyRepository nr;

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
	
	@Scheduled(/*fixedRate=300000*/ fixedDelay=300000)
	public void deleteOldNearbies(){
		System.out.println("yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay");
		if(con!=null){
			try {
				Statement s=con.createStatement();
				s.executeUpdate("DELETE from nearby where extract (epoch from(CURRENT_TIMESTAMP-updated::timestamp))::integer/60>5");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
	}
	
	@Scheduled(fixedDelay=3000)
	public void findnearbymatches(){
		List<Location> locations=(List<Location>) lr.findAll();
		for(int i=0;i<locations.size();i++){
			
			ResultSet rs;
			if(con!=null){
				try {
					PreparedStatement ps=con.prepareStatement("Select id, user_id, height, "
							+ "width,acos(sin(radians(?))*sin(radians(height)) + cos(radians(?))*cos(radians(height))*cos(radians(width)-radians(?))) * 6371000 "
							+ "From location Where acos(sin(radians(?))*sin(radians(height)) + cos(radians(?))*cos(radians(height))*cos(radians(width)-radians(?))) "
							+ "* 6371000 < 100 and id!=?");
					
					ps.setDouble(1, locations.get(i).getHeight());
					ps.setDouble(2, locations.get(i).getHeight());
					ps.setDouble(3, locations.get(i).getWidth());
					ps.setDouble(4, locations.get(i).getHeight());
					ps.setDouble(5, locations.get(i).getHeight());
					ps.setDouble(6, locations.get(i).getWidth());
					ps.setLong(7, locations.get(i).getId());
					rs=ps.executeQuery();
					while(rs.next()){
						Nearby n=nr.getnearbybyusers(locations.get(i).getUser().getId(), rs.getLong(2));
						if(n==null){
							Similarity sim= sr.getusersimilarity(locations.get(i).getUser().getId(), rs.getLong(2));
							if(sim!=null && sim.getPercentage()>0.5){
								System.out.println("imamo slicnost wohooo");
								Nearby newNearby= new Nearby();
								newNearby.setUser2(locations.get(i).getUser());
								newNearby.setUser1(ur.getUserById(rs.getLong(2)));
								newNearby.setPercentage(sim.getPercentage());
								nr.save(newNearby);
							}
						}
						
						
						System.out.println("Lokacija: "+Integer.toString(rs.getInt(1))+", korisnik: "+rs.getLong(2)+", i korisnik:"+locations.get(i).getUser().getId()+", distanca: "+rs.getDouble(5));
					}
					
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
			}
		}
	}
}
