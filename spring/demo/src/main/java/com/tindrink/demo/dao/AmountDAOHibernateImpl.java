package com.tindrink.demo.dao;

import java.util.List;

import javax.persistence.EntityManager;

import com.tindrink.demo.entity.Amount;
import com.tindrink.demo.entity.Ingredient;

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

        Session currentSession = entityManager.unwrap(Session.class);

        Query theQuery = currentSession.createQuery("DELETE FROM Amount WHERE drink_id =:drinkId");

        theQuery.setParameter("drinkId", id);

        theQuery.executeUpdate();

    }

    @Override
    public Boolean getAmountByIngredientId(int id) {

        Session currentSession = entityManager.unwrap(Session.class);

        Query<Amount> theQuery = currentSession.createQuery("FROM Amount WHERE ingredient_id =:ingredientId", Amount.class);

        theQuery.setParameter("ingredientId", id);

        List<Amount> ingredients = theQuery.getResultList();

        if (ingredients.size() > 0) {
            return true;
        } else {
            return false;
        }
    
    }



}