package com.tindrink.demo.dao;


import com.tindrink.demo.entity.Role;

public interface RoleDAO {

    public Role getRoleByName(String userName);

    public void save(Role theRole);
}