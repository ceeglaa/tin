package com.tindrink.demo;

import com.tindrink.demo.entity.Drink;
import com.tindrink.demo.entity.Ingredient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		Drink.initData();
		SpringApplication.run(DemoApplication.class, args);
	}

}
