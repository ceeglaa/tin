package com.tindrink.demo.rest;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonView;
import com.tindrink.demo.entity.Drink;
import com.tindrink.demo.entity.Ingredient;
import com.tindrink.demo.entity.Views;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3001", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class IngredientRestController {

    // expore "/" that return "hello world"

    @Value("${test.name}")
    private String test;


    @GetMapping("/")
    public String sayHello() {
        Ingredient.initData();
        Drink.initData();
        return "Hello World! TIme on servers is  " + LocalDateTime.now() + "PROPERITER VALUE " + test;
    }

    @GetMapping("/ingredients")
    @JsonView(Views.List.class)
    public List<Ingredient> sayHelloIng() {
        return Ingredient.getAllIngredients();
    }

    @JsonView(Views.IngredientDetails.class)
    @GetMapping("/ingredients/{ingredientId}")
	public Ingredient getAdditionalInfo(@PathVariable int ingredientId) {
		return Ingredient.getIngredient(ingredientId);
    }
    
    @PostMapping("/ingredients")
    public Ingredient createIngredient (@Valid @RequestBody Ingredient ingredient) {
        System.out.println("price new ing ");
        System.out.println(ingredient.getPrice());
        Ingredient.addIngredient(ingredient);
        System.out.println(Ingredient.getAllIngredients().size());
        return ingredient;
    }

}