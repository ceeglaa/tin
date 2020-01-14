package com.tindrink.demo.dao;

import java.util.List;
import com.tindrink.demo.entity.Ingredient;

public interface IngredientDAO {

    public List<Ingredient> findAll();

    public Ingredient findById(int id);

    public Ingredient findByName(String name);

    public void save(Ingredient theIngredient);

    public void deleteById(int Id);


}