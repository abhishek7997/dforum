package com.abhishek.dforum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:application.properties")
@PropertySource("classpath:jwt.properties")
public class DforumApplication {

	public static void main(String[] args) {
		SpringApplication.run(DforumApplication.class, args);
	}

}
