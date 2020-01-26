package com.tindrink.demo.entity;

import java.util.HashSet;
import java.util.Set;


import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
public class Ingredient {

    //private static List<Ingredient> ingredientExtent = new ArrayList<Ingredient>();
    //private static int nextid = 1;
    
    @NotNull
    @JsonView(Views.List.class)
    private String name;

    @NotNull
    @JsonView(Views.List.class)
    private boolean isAlc;

    @NotNull
    @JsonView(Views.List.class)
    private boolean isGas;

    @NotNull
    @Min(0)
    @JsonView(Views.List.class)
    private float price;

    @NotNull
    @JsonView(Views.List.class)
    private String taste;

    @NotNull
    @Min(0)
    @JsonView(Views.List.class)
    private float vol;
 
    @JsonView(Views.IngredientDetails.class)
    private Set<Amount> amounts = new HashSet<>();

    @JsonView(Views.List.class)
    private int id;


    @JsonCreator
    public Ingredient () {
   
    }
    public Ingredient(String name, boolean isAlc, boolean isGas, float price, String taste, int vol) {
        System.out.println(" W KONSTRUKTORZE /n/n/n \n\n\n");
        this.name = name;
        this.isAlc = isAlc;
        this.isGas = isGas;
        this.price = price;
        this.taste = taste;
        this.vol = vol;
        
    }

    // public static void addIngredient(Ingredient ing) {
    //     ing.setId(nextid++);
    //     ingredientExtent.add(ing);
    // }

    // public static List<Ingredient> getAllIngredients() {
    //     return ingredientExtent;
    // }

    // public static Ingredient getIngredient(int id) {
    //     Ingredient res;
    //     res = ingredientExtent
    //     .stream()
    //     .filter(ing -> ing.id == id)
    //     .findAny()
    //     .orElse(null);
    //     return res;
    // }

    // public static List<Ingredient> getDrinkIngredients(Set<Integer> ids) {
    //     List<Ingredient> res = ingredientExtent
    //     .stream()
    //     .filter(i -> ids.contains(i.id))
    //     .collect(Collectors.toList());

    //     return res;
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

    @Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isAlc() {
        return isAlc;
    }

    public void setAlc(boolean isAlc) {
        this.isAlc = isAlc;
    }

    public boolean isGas() {
        return isGas;
    }

    public void setGas(boolean isGas) {
        this.isGas = isGas;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        System.out.println("setting PRICE --->>> ");
        System.out.println(price);
        this.price = price;
    }

    public String getTaste() {
        return taste;
    }

    public void setTaste(String taste) {
        this.taste = taste;
    }

    @OneToMany(mappedBy="ingredient",
    cascade= {CascadeType.PERSIST, CascadeType.MERGE,
              CascadeType.DETACH, CascadeType.REFRESH})
    public Set<Amount> getAmounts() {
        return amounts;
    }

    public void setAmounts(Set<Amount> amounts) {
        this.amounts = amounts;
    }

    public void addAmount(Amount amount) {

        if (this.amounts == null) {
			this.amounts = new HashSet<>();
        }
        
        if(!this.amounts.contains(amount)) {
            this.amounts.add(amount);
            amount.setIngredient(this);
        }
    }

    // public static void initData() {
    //     Ingredient ing1 = new Ingredient("Adrian", false, true, 5, "słodki", 0);
    //     Ingredient.addIngredient(ing1);
    //     Ingredient ing2 = new Ingredient("Mirinda", false, true, 5, "słodki", 0);
    //     Ingredient.addIngredient(ing2);
    //     Ingredient ing4 = new Ingredient("Absolut", true, false, 40, "dobry", 40);
    //     Ingredient.addIngredient(ing4);
    //     Ingredient ing5 = new Ingredient("JimBeam", true, false, 40, "dębowy", 40);
    //     Ingredient.addIngredient(ing5);
    // }



}
