package com.tindrink.demo.entity;

public class Views {

    public static interface Amount{}

    public static interface Use{}

    public static interface Admin extends Use{}

    public static interface List {}

    public static interface DrinkDetails extends List, Amount{}

    public static interface IngredientDetails extends List, Amount{}

    public static interface AllDetails extends DrinkDetails, IngredientDetails {}

}