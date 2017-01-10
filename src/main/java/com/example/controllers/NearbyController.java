package com.example.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Nearby;
import com.example.repositories.NearbyRepository;

@RestController
@RequestMapping("/nearbymobile")
public class NearbyController {
	
	@Autowired
	NearbyRepository nr;
	
	@RequestMapping("/get")
	public List<NearbyMResponse> getnearbyusers(@Param("username") String username){
		List<NearbyMResponse> outList=new ArrayList<NearbyMResponse>();
		List<Nearby> nearbyList=nr.getnearbiesbyusername(username);
		for(int i=0;i<nearbyList.size();i++){
			if(nearbyList.get(i).getUser1().getUsername().equals(username)){
				NearbyMResponse nmr=new NearbyMResponse();
				nmr.percentage=nearbyList.get(i).getPercentage();
				nmr.username=nearbyList.get(i).getUser2().getUsername();
				outList.add(nmr);
			}
			else{
				NearbyMResponse nmr=new NearbyMResponse();
				nmr.percentage=nearbyList.get(i).getPercentage();
				nmr.username=nearbyList.get(i).getUser1().getUsername();
				outList.add(nmr);
			}
		}
		return outList;
	}
	
	private static class NearbyMResponse{
		public String username;
		public double percentage;
	}
}

