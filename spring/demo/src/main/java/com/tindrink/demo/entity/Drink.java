package com.tindrink.demo.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonMerge;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;


@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Drink {

    private static int nextId = 1;
    private static List<Drink> drinkExtent = new ArrayList<>();
    @JsonView(Views.List.class)
    private String name;
    @JsonView(Views.List.class)
    private float vol;
    @JsonView(Views.List.class)
    private String taste;
    @JsonView(Views.List.class)
    private float price;
    @JsonView(Views.List.class)
    private String desc;
    @JsonView(Views.List.class)
    private String photoPath;
    @JsonView(Views.List.class)
    private Integer id;
    @JsonIgnore
    @JsonView(Views.DrinkDetails.class)
    private List<Amount> amounts = new ArrayList<>();

    @JsonCreator
    public Drink() {
        this.id = nextId++;
    }

    public Drink(String name, float vol, String taste, float price, String desc, String photoPath) {
        this.name = name;
        this.vol = vol;
        this.taste = taste;
        this.price = price;
        this.desc = desc;
        this.photoPath = photoPath;
        this.id = nextId++;
    }

    public static void addDrink(Drink drink){
        drinkExtent.add(drink);
    }

    public static void deleteDrink(int id){
        drinkExtent.removeIf(drink -> drink.id.equals(id));
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getVol() {
        return vol;
    }

    public void setVol(float vol) {
        this.vol = vol;
    }

    public String getTaste() {
        return taste;
    }

    public void setTaste(String taste) {
        this.taste = taste;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getphotoPath() {
        return photoPath;
    }

    public void setphotoPath(String photoPath) {
        this.photoPath = photoPath;
    }


    public int getId() {
        return id;
    }

    public static List<Drink> getAllDrinks(){
        return drinkExtent;
    }

    public void addAmount(Amount amount){
        if(amount.getDrink() != this){
            throw new IllegalArgumentException("Incorret drink");
        }
        if(!this.amounts.contains(amount)) {
            this.amounts.add(amount);
        }
    }

    public List<Amount> getAmounts() {
        return amounts;
    }


    public static Drink getDrink(int id){
        Drink res;
        res = drinkExtent
            .stream()
            .filter(ing -> ing.id == id)
            .findAny()
            .orElse(null);
        return res;
    }

    

    public static void initData(){

        Ingredient.initData();

        Drink drink1 = new Drink("Drink1", 25, "slodki", 23, "przykładowy opis drinka", "../img/Drink2.jpg");
        Drink drink2 = new Drink("Drnink2", 30, "slodki", 15, "przykładowy opis drinka", "../img/Drink2.jpg");
        Drink drink3 = new Drink("Drnink3", 25, "slodki", 23, "przykładowy opis drinka", "../img/Drink3.jpg");
        Drink drink4 = new Drink("Drink4", 30, "slodki", 15, "przykładowy opis drinka", "../img/Drink4.jpg");
        Drink.addDrink(drink1);
        Drink.addDrink(drink2);
        Drink.addDrink(drink3);
        Drink.addDrink(drink4);

        List<Ingredient> ingredients = Ingredient.getAllIngredients();
        Amount am1 = new Amount(ingredients.get(0), drinkExtent.get(0), 20 );
        Amount am2 = new Amount(ingredients.get(1), drinkExtent.get(0), 20 );

        Amount am3 = new Amount(ingredients.get(0), drinkExtent.get(1), 340 );
        Amount am4 = new Amount(ingredients.get(2), drinkExtent.get(1), 550 );
        Amount am5 = new Amount(ingredients.get(3), drinkExtent.get(1), 20 );

        Amount am7 = new Amount(ingredients.get(1), drinkExtent.get(2), 201 );
        Amount am8 = new Amount(ingredients.get(3), drinkExtent.get(2), 50 );
        Amount am9 = new Amount(ingredients.get(0), drinkExtent.get(2), 240 );
    
    }

 

}