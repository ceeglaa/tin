package com.tindrink.demo.entity;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

public class Amount {

    @JsonView(Views.DrinkDetails.class)
    private Ingredient ingredient;
    @JsonView(Views.IngredientDetails.class)
    private Drink drink;
    @JsonView(Views.Amount.class)
    private int amount;

    @JsonCreator
    public Amount () {}

    public Amount(Ingredient ingredient, Drink drink, int amount) {
        System.out.println("Inside amount constructor");
        setIngredient(ingredient);
        setDrink(drink);
        setAmount(amount);
    }


    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        if(ingredient == null) {
            throw new IllegalArgumentException("Ingredient is null");
        } else {
            this.ingredient = ingredient;
            this.ingredient.setAmount(this);
        }
    }


    public Drink getDrink() {
        return drink;
    }

    public void setDrink(Drink drink) {
        if(drink == null){
            throw new IllegalArgumentException("drink is null");
        } else {
            this.drink = drink;
            this.drink.addAmount(this);
        }
        
    }


    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    

}