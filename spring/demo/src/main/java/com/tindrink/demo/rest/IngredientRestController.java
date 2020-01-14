package com.tindrink.demo.rest;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonView;
import com.tindrink.demo.dao.AmountDAO;
import com.tindrink.demo.dao.IngredientDAO;
import com.tindrink.demo.dao.IngredientDAOHibernateImpl;
import com.tindrink.demo.entity.Drink;
import com.tindrink.demo.entity.Ingredient;
import com.tindrink.demo.entity.Views;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    private AmountDAO amountDAO;

    @Autowired
    public IngredientRestController(IngredientDAO ingredientDAO, AmountDAO amountDAO) {
        this.ingredientDAO = ingredientDAO;
        this.amountDAO = amountDAO;
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
    
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/ingredients")
    public ResponseEntity<String> createIngredient (@Valid @RequestBody Ingredient ingredient) {
        
        if(ingredientDAO.findByName(ingredient.getName())==null) {
            ingredientDAO.save(ingredient);
            return new ResponseEntity<>("Składnik o nazwie " + ingredient.getName() + " został dodany", HttpStatus.CREATED);
        } else {         
             return new ResponseEntity<>("Produkt " + ingredient.getName() + " już istnieje", HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/ingredients/{ingredientId}")
    public String updateIngredient(@PathVariable int ingredientId, @Valid @RequestBody Ingredient theIngredient) {
        theIngredient.setId(ingredientId);
        ingredientDAO.save(theIngredient);
        return "git";
    }

    @DeleteMapping("/ingredients/{ingredientId}")
    public ResponseEntity<String> deleteIngredient(@PathVariable int ingredientId){
        if(amountDAO.getAmountByIngredientId(ingredientId)) {
            return new ResponseEntity<>("Produkt jest używany w drinkach.", HttpStatus.CONFLICT);
        } else {
            ingredientDAO.deleteById(ingredientId);
            return new ResponseEntity<>("Produkt został usunięty", HttpStatus.OK);
        }
        
    }

}