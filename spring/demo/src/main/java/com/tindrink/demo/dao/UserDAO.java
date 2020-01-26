package com.tindrink.demo.dao;

import com.tindrink.demo.entity.User;

public interface UserDAO {

    public User getUserByUserName(String userName);

    public void save(User theUser);

}