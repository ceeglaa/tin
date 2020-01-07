package com.tindrink.demo.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

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

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Amount {

    private int id;

    @JsonView(Views.DrinkDetails.class)
    private Ingredient ingredient;

    @JsonView(Views.IngredientDetails.class)
    private Drink drink;

    @JsonView(Views.Amount.class)
    private int amount;


    public Amount() {

    }

    public Amount(int amount) {
        System.out.println("Inside amount just int");
        setAmount(amount);
    }

    public Amount(Ingredient ingredient, Drink drink, int amount) {
        System.out.println("Inside amount constructor");
        // setIngredient(ingredient);
        // setDrink(drink);
        // setAmount(amount);
    }


    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE,
        CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name="ingredient_id")
    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        if(ingredient == null) {
            throw new IllegalArgumentException("Ingredient is null");
        } else {
            this.ingredient = ingredient;
        }
    }

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE,
        CascadeType.DETACH, CascadeType.REFRESH},
        fetch= FetchType.EAGER)
    public Drink getDrink() {
        return drink;
    }

    public void setDrink(Drink drink) {

        if(drink != null){
        
            if(this.drink != drink){
                Drink oldDrink = this.drink;
                this.drink = drink;

                if(oldDrink != null) {
                    oldDrink.removeAmount(this);
                } 
        
            }
        }
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    

}