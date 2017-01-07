package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EtfHobbyApplication {
	
	@Bean
	public FilterRegistrationBean jwtFilter(){
		final FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
		filterRegistrationBean.setFilter(new JwtFilter());
		filterRegistrationBean.addUrlPatterns("/api/*");
		return filterRegistrationBean;
	}

	public static void main(String[] args) {
		SpringApplication.run(EtfHobbyApplication.class, args);
	}
}
