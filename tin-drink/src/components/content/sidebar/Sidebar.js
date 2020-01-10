import React from 'react';
import './Sidebar.css'

function Sidebar() {
  return (
    <div className="sidebar">
    <nav className="nav">
        <ul>
            <li><a href="data/Lista_Drinków.html">Lista Drinków</a></li>
            <li><a href="data/Lista_Składników.html">Lista Składników</a></li>
            <li><a href="data/Dodaj_Drinka_two.html">Dodaj Drinka</a></li>
            <li><a href="data/Dodaj_Skladnik.html">Dodaj Skladnik</a></li>
        </ul>
    </nav>
</div>
  );
}

export default Sidebar;