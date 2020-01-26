
package com.tindrink.demo.dao;

import javax.persistence.EntityManager;

import com.tindrink.demo.entity.Role;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RoleDAOImplementation implements RoleDAO {

    private EntityManager entityManager;

    @Autowired
    public RoleDAOImplementation(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Role getRoleByName(String roleName) {

        Session currentSession = entityManager.unwrap(Session.class);

        Query<Role> theQuery = currentSession.createQuery("from Role WHERE name =:roleName", Role.class);

        theQuery.setMaxResults(1);

        theQuery.setParameter("roleName", roleName);

        Role role = theQuery.getSingleResult();

        return role; 
    }

    @Override
    public void save(Role theRole) {
                     
        Session currentSession = entityManager.unwrap(Session.class);

        currentSession.saveOrUpdate(theRole);

    }
    
}