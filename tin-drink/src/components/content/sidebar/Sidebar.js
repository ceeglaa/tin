import React from 'react';
import {BrowserRouter, NavLink, Route} from 'react-router-dom';
import './Sidebar.css'

function Sidebar() {
  console.log('RENDER SIDEBAR')
  return (
    <div className="sidebar-nav">
    <div className="sidebar">
    <nav className="nav">
        <ul>
          
            <li><NavLink to="/Lista_Drinkow" exact>Lista Drinków</NavLink></li>
            <li><NavLink to="/Lista_Składnikow" exact>Lista Składników</NavLink></li>
            <li><NavLink to="/Dodaj_Drinka" exact>Dodaj Drinka</NavLink></li>
            <li><NavLink to="/Dodaj_Skladnik" exact>Dodaj Skladnik</NavLink></li>

            
        </ul>
    </nav>
</div>
</div>
  );
}

export default Sidebar;