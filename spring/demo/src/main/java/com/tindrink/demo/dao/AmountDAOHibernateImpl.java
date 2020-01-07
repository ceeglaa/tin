package com.tindrink.demo.dao;

import java.util.List;

import javax.persistence.EntityManager;

import com.tindrink.demo.entity.Amount;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class AmountDAOHibernateImpl implements AmountDAO {

    private EntityManager entityManager;

    public AmountDAOHibernateImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Amount theAmount) {

        Session currentSession = entityManager.unwrap(Session.class);
        System.out.println("inside save amount");

        currentSession.saveOrUpdate(theAmount);

    }

    @Override
    @Transactional
    public void deleteOnDrinkId(int id) {

        System.out.println("inside delete on drink id");

        Session currentSession = entityManager.unwrap(Session.class);

        Query theQuery = currentSession.createQuery("DELETE FROM Amount WHERE drink_id =:drinkId");

        theQuery.setParameter("drinkId", id);

        theQuery.executeUpdate();

    }



}