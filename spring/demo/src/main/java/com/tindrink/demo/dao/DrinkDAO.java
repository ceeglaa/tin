package com.tindrink.demo.dao;

import java.util.List;

import com.tindrink.demo.entity.Drink;

public interface DrinkDAO {

    public List<Drink> findAll();

    public Drink findById(int id);

    public void save(Drink theDrink);

    public void deleteById(int Id);

    public Drink getLast();

}