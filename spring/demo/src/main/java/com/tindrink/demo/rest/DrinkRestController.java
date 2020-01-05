package com.tindrink.demo.rest;

import org.json.JSONObject;
import org.springframework.boot.json.JsonParser;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tindrink.demo.entity.Amount;
import com.tindrink.demo.entity.Drink;
import com.tindrink.demo.entity.Ingredient;
import com.tindrink.demo.entity.Views;

@CrossOrigin(origins = "http://localhost:3001", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class DrinkRestController {

    @GetMapping("/drinks")
    @JsonView(Views.List.class)
    public List<Drink> getDrinkList() {
        return Drink.getAllDrinks();
    }

    @GetMapping("/drinks/{drinkId}")
    @JsonView(Views.DrinkDetails.class)
    public Drink getDrinkDetail(@PathVariable int drinkId) {
        return Drink.getDrink(drinkId);
    }

    @PostMapping("/drinks")
    public Drink createDrink(@RequestBody Map<String, Object> body) {

        Map<String, String> drinkMap = (Map<String, String>) body.get("drink");
        List<Map<String, String>> amountMap = (List<Map<String, String>>) body.get("amounts");

        System.out.println(amountMap);

        System.out.println(amountMap.size());

        ObjectMapper mapper = new ObjectMapper(); // jackson's objectmapper
        Drink drink;
        try {
            drink = mapper.readValue(mapper.writeValueAsString(drinkMap), Drink.class);
            Drink.addDrink(drink);
            amountMap.forEach(am -> {
                try {
                    System.out.println(mapper.writeValueAsString(am.get("ingredient")));
                    JSONObject obj = new JSONObject(mapper.writeValueAsString(am.get("ingredient")));
                    int id = obj.getInt("id");
                    Amount amo = new Amount(Ingredient.getIngredient(id), drink, 120);
                    
                } catch (JsonProcessingException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            });
            return drink;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }
            
    }


    @DeleteMapping("/drinks/{drinkId}")
    public String deleteDrink(@PathVariable int drinkId) {
        Drink.deleteDrink(drinkId);
        return "Drink was removed successfully";
    }
}
