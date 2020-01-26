package com.tindrink.demo.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import javax.validation.constraints.Pattern.Flag;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class User {

    private int id;

    @Size(min=2)
    @JsonView(Views.List.class)
    private String firstName;

    @Size(min=2)
    @JsonView(Views.List.class)
    private String lastName;

    @Size(min=2)
    @JsonView(Views.List.class)
    private String userName;

    @Size(min=8)
    //@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", flags = Flag.UNICODE_CASE)
    private String password; 
    
    @JsonView(Views.List.class)
    private String email;
    @JsonView(Views.List.class)
    private Role role;
    @JsonView(Views.List.class)
    private Set<Drink> favouriteDrinks = new HashSet<>();

    @Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Column(unique = true)
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(unique = true)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE,
        CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name="role_id")
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @ManyToMany(cascade = CascadeType.ALL)
    public Set<Drink> getFavouriteDrinks() {
        return favouriteDrinks;
    }

    public void setFavouriteDrinks(Set<Drink> favouriteDrinks) {
        this.favouriteDrinks = favouriteDrinks;
    }

    public void addFavouriteDrink(Drink drink) {
        this.favouriteDrinks.add(drink);
    }
    
}