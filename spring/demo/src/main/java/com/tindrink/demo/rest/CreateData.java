package com.tindrink.demo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tindrink.demo.dao.AmountDAO;
import com.tindrink.demo.dao.DrinkDAO;
import com.tindrink.demo.dao.IngredientDAO;
import com.tindrink.demo.dao.RoleDAO;
import com.tindrink.demo.entity.Role;

@RestController
@CrossOrigin
public class CreateData {
    
    private DrinkDAO drinkDao;
    private IngredientDAO ingredientDao;
    private AmountDAO amountDao;
    private RoleDAO roleDao;

    
    @Autowired
    public CreateData(DrinkDAO drinkDao, IngredientDAO ingredientDao, AmountDAO amountDao){
        this.drinkDao = drinkDao;
        this.ingredientDao = ingredientDao;
        this.amountDao = amountDao;
    }

    @PostMapping(value = "/createData")
    public ResponseEntity<String> updateLotImage(){

        Role role = new Role();
        role.setName("USER");
        roleDao.save(role);

        return new ResponseEntity<String>("Success", HttpStatus.OK);
    }

}