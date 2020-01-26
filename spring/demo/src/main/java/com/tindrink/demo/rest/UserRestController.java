package com.tindrink.demo.rest;

import com.fasterxml.jackson.annotation.JsonView;
import com.tindrink.demo.dao.AmountDAO;
import com.tindrink.demo.dao.DrinkDAO;
import com.tindrink.demo.dao.IngredientDAO;
import com.tindrink.demo.dao.UserDAO;
import com.tindrink.demo.entity.Drink;
import com.tindrink.demo.entity.User;
import com.tindrink.demo.entity.Views;
import com.tindrink.demo.service.UserAuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserRestController {

    private UserAuthService userAuthService;
    private UserDAO userDao;


    @Autowired
    public UserRestController(UserDAO userDao, UserAuthService userAuthService) {
        this.userDao = userDao;
        this.userAuthService = userAuthService;
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/users/{userName}/{drinkId}")
    public ResponseEntity<String> addFavouriteDrink(@PathVariable int drinkId, @PathVariable String userName) {
        userAuthService.addFavouriteDrink(userName, drinkId);
        return new ResponseEntity<>("Drink został dodany do ulubionych", HttpStatus.OK);
    } 

    @GetMapping("/users/{userName}")
    @JsonView(Views.List.class)
    public User getAllUsers(@PathVariable String userName){
        return userDao.getUserByUserName(userName);

    }
    
}