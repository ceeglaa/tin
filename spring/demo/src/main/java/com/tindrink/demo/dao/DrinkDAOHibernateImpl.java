package com.tindrink.demo.dao;

import java.util.List;

import javax.persistence.EntityManager;

import com.tindrink.demo.entity.Drink;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class DrinkDAOHibernateImpl implements DrinkDAO {

    private EntityManager entityManager;

    public DrinkDAOHibernateImpl (EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public List<Drink> findAll() {
        
        Session currentSession = entityManager.unwrap(Session.class);

        Query<Drink>  theQuery = currentSession.createQuery("from Drink", Drink.class);

        List<Drink> drinks = theQuery.getResultList();

        return drinks;
    }

    @Override
    @Transactional
    public Drink findById(int id) {

        Session currentSession = entityManager.unwrap(Session.class);

        Drink drink = currentSession.get(Drink.class, id);

        return drink;
    }

    @Override
    @Transactional
    public void save(Drink theDrink) {
      
        Session currentSession = entityManager.unwrap(Session.class);

        currentSession.saveOrUpdate(theDrink);
    }

    @Override
    @Transactional
    public void deleteById(int id) {
        Session currentSession = entityManager.unwrap(Session.class);

        Query theQuery = currentSession.createQuery("DELETE FROM Drink WHERE id =:drinkId");

        theQuery.setParameter("drinkId", id);

        theQuery.executeUpdate();

    }

    @Override
    @Transactional
    public Drink getLast(){
        Session currentSession = entityManager.unwrap(Session.class);

        Query<Drink>  theQuery = currentSession.createQuery("FROM Drink ORDER BY Id DESC", Drink.class);

        Drink drink= theQuery.getResultList().get(0);

        return drink;
    }
}