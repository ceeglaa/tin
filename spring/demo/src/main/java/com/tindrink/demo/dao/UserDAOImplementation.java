
package com.tindrink.demo.dao;

import java.util.List;

import javax.persistence.EntityManager;

import com.tindrink.demo.entity.Role;
import com.tindrink.demo.entity.User;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAOImplementation implements UserDAO {

    private EntityManager entityManager;

    @Autowired
    public UserDAOImplementation(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public User getUserByUserName(String userName) {

        Session currentSession = entityManager.unwrap(Session.class);

        Query<User> theQuery = currentSession.createQuery("from User WHERE userName =:userName", User.class);

        theQuery.setParameter("userName", userName);

        User user = theQuery.getSingleResult();

        return user; 
    }

    @Override
    public void save(User theUser) {
             
        Session currentSession = entityManager.unwrap(Session.class);

        currentSession.saveOrUpdate(theUser);

    }

}