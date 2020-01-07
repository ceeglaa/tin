package com.tindrink.demo.entity;

import java.util.List;

import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;


public class Dog {

    private Long id;
    private String name;
    private int age;
    private List<Connect> connect;

    public Dog () {

    }

    private Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @OneToMany(fetch = FetchType.LAZY)
    public List<Connect> getConnect() {
        return connect;
    }

    public void setConnect(Connect connect) {
        this.connect.add(connect);
    }

    

  

    
}