package com.tindrink.demo.rest;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonView;
import com.tindrink.demo.dao.IngredientDAO;
import com.tindrink.demo.dao.IngredientDAOHibernateImpl;
import com.tindrink.demo.entity.Drink;
import com.tindrink.demo.entity.Ingredient;
import com.tindrink.demo.entity.Dog;
import com.tindrink.demo.entity.Views;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class IngredientRestController {


    private IngredientDAO ingredientDAO;

    @Autowired
    public IngredientRestController(IngredientDAO ingredientDAO) {
        this.ingredientDAO = ingredientDAO;
    }

    @GetMapping("/")
    public String sayHello() {
       // Ingredient.initData();
        // Drink.initData();
        return "Hello World! TIme on servers is  " + LocalDateTime.now();
    }

    @JsonView(Views.List.class)
    @GetMapping("/ingredients")
    public List<Ingredient> sayHelloIng() {
        return ingredientDAO.findAll();
    }

    @JsonView(Views.IngredientDetails.class)
    @GetMapping("/ingredients/{ingredientId}")
	public Ingredient getAdditionalInfo(@PathVariable int ingredientId) {
		return ingredientDAO.findById(ingredientId);
    }
    
    @PostMapping("/ingredients")
    public Ingredient createIngredient (@Valid @RequestBody Ingredient ingredient) {
        System.out.println("price new ing ");
        ingredientDAO.save(ingredient);
        return ingredient;
    }

    @PutMapping("/ingredients/{ingredientId}")
    public String updateIngredient(@PathVariable int ingredientId, @Valid @RequestBody Ingredient theIngredient) {
        theIngredient.setId(ingredientId);
        ingredientDAO.save(theIngredient);
        return "git";
    }

    @DeleteMapping("/ingredients/{ingredientId}")
    public String deleteIngredient(@PathVariable int ingredientId){
        ingredientDAO.deleteById(ingredientId);
        return "Ingredient had been deleted";
    }

}