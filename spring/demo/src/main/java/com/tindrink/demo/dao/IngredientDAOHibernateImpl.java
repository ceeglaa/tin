package com.tindrink.demo.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tindrink.demo.entity.Ingredient;


@Repository
public class IngredientDAOHibernateImpl implements IngredientDAO {

   private EntityManager entityManager;

    @Autowired
    public IngredientDAOHibernateImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public List<Ingredient> findAll() {
        
        Session currentSession = entityManager.unwrap(Session.class);

        Query<Ingredient>  theQuery = currentSession.createQuery("from Ingredient", Ingredient.class);

        List<Ingredient> ingredients = theQuery.getResultList();

        return ingredients;
    }

    @Override
    @Transactional
    public Ingredient findById(int id) {
        
        Session currentSession = entityManager.unwrap(Session.class);

        System.out.println(" Inside find by id");

        Ingredient ingredient = currentSession.get(Ingredient.class, id);

        return ingredient;

    }

    @Override
    @Transactional
    public void save(Ingredient theIngredient) {
        // TODO Auto-generated method stub

        Session currentSession = entityManager.unwrap(Session.class);

        currentSession.saveOrUpdate(theIngredient);
    }

    @Override
    @Transactional
    public void deleteById(int id) {
        
        Session currentSession = entityManager.unwrap(Session.class);

        Query theQuery = currentSession.createQuery("DELETE FROM Ingredient WHERE id =:ingredientId");

        theQuery.setParameter("ingredientId", id);

        theQuery.executeUpdate();
    }

    
    

}