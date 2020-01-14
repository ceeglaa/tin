package com.tindrink.demo.entity;

import java.util.HashSet;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;



@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
public class Drink {

    private static int nextId = 1;
    // private static List<Drink> drinkExtent = new ArrayList<>();
    @JsonView(Views.List.class)
    private String name;
    @JsonView(Views.List.class)
    private float vol;
    @JsonView(Views.List.class)
    private String taste;
    @JsonView(Views.List.class)
    private float price;
    @JsonView(Views.List.class)
    private String drinkDesc;
    @JsonView(Views.List.class)
    private String photoPath;
    @JsonView(Views.List.class)
    private int id;
    @JsonView(Views.DrinkDetails.class)
    private Set<Amount> amounts = new HashSet<>();

    @JsonCreator
    public Drink() {
    }

    public Drink(String name, float vol, String taste, float price, String drinkDesc, String photoPath) {
        this.name = name;
        this.vol = vol;
        this.taste = taste;
        this.price = price;
        this.drinkDesc = drinkDesc;
        this.photoPath = photoPath;
        this.id = nextId++;
    }

    // public static void addDrink(Drink drink){
    //     drinkExtent.add(drink);
    // }

    // public static void deleteDrink(int id){
    //     drinkExtent.removeIf(drink -> drink.id.equals(id));
    // }

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

    public String getDrinkDesc() {
        return drinkDesc;
    }

    public void setDrinkDesc(String drinkDesc) {
        this.drinkDesc = drinkDesc;
    }

    public String getphotoPath() {
        return photoPath;
    }

    public void setphotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // public static List<Drink> getAllDrinks(){
    //     return drinkExtent;
    // }

    public void setAmounts(Set<Amount> amounts){
      this.amounts = amounts;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy="drink",
    cascade= CascadeType.ALL, orphanRemoval = true)
    public Set<Amount> getAmounts() {
        return amounts;
    }

    public void addAmount(Amount amount){
        if(this.amounts == null) {
            this.amounts = new HashSet<>();
        }
        if(!this.amounts.contains(amount)) {
            this.amounts.add(amount);
            amount.setDrink(this);
        }
    }

    public void removeAmount(Amount amount) {
        if (this.amounts.contains(amount)) {
            this.amounts.remove(amount);
        }
    }

    public void clearAmounts(){
        this.amounts.clear();
    }


    // public static Drink getDrink(int id){
    //     Drink res;
    //     res = drinkExtent
    //         .stream()
    //         .filter(ing -> ing.id == id)
    //         .findAny()
    //         .orElse(null);
    //     return res;
    // }

    

    // public static void initData(){

    //    Ingredient.initData();

    //     Drink drink1 = new Drink("Drink1", 25, "slodki", 23, "przykładowy opis drinka", "../img/Drink2.jpg");
    //     Drink drink2 = new Drink("Drnink2", 30, "slodki", 15, "przykładowy opis drinka", "../img/Drink2.jpg");
    //     Drink drink3 = new Drink("Drnink3", 25, "slodki", 23, "przykładowy opis drinka", "../img/Drink3.jpg");
    //     Drink drink4 = new Drink("Drink4", 30, "slodki", 15, "przykładowy opis drinka", "../img/Drink4.jpg");
    //     Drink.addDrink(drink1);
    //     Drink.addDrink(drink2);
    //     Drink.addDrink(drink3);
    //     Drink.addDrink(drink4);

    //     List<Ingredient> ingredients = Ingredient.getAllIngredients();
    //     Amount am1 = new Amount(ingredients.get(0), drinkExtent.get(0), 20 );
    //     Amount am2 = new Amount(ingredients.get(1), drinkExtent.get(0), 20 );

    //     Amount am3 = new Amount(ingredients.get(0), drinkExtent.get(1), 340 );
    //     Amount am4 = new Amount(ingredients.get(2), drinkExtent.get(1), 550 );
    //     Amount am5 = new Amount(ingredients.get(3), drinkExtent.get(1), 20 );

    //     Amount am7 = new Amount(ingredients.get(1), drinkExtent.get(2), 201 );
    //     Amount am8 = new Amount(ingredients.get(3), drinkExtent.get(2), 50 );
    //     Amount am9 = new Amount(ingredients.get(0), drinkExtent.get(2), 240 );
    
    // }

 

}