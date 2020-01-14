package com.tindrink.demo.dao;

import com.tindrink.demo.entity.Amount;;

public interface AmountDAO {

    public void save(Amount theAmount);

    public void deleteOnDrinkId(int id);

    public Boolean getAmountByIngredientId(int id);
}