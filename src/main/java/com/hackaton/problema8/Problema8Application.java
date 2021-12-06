package com.hackaton.problema8;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
@EntityScan(basePackages = {"com.hackaton.problema8.model"})
public class Problema8Application {

	public static void main(String[] args) {
		SpringApplication.run(Problema8Application.class, args);
	}

}
