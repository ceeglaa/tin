import React from 'react';
import {NavLink} from 'react-router-dom';
import './Sidebar.css'

class Sidebar extends React.Component {
 
 
  state = {
    glowna: {
        link: '/',
        title: 'Strona główna'
    },
    drinkList: {
        link: '/Lista_Drinkow',
        title: 'Lista Drinków'
    },
    ingredientsList: {
        link: '/Lista_Składnikow',
        title: 'Lista Składników'
    },
    addIngredient: {
        link: '/Dodaj_Skladnik',
        title: 'Dodaj Składnik'
    },
    addDrink: {
        link: '/Dodaj_Drinka',
        title: 'Dodaj Drinka'
    }
}

drinkListPath = () => {
  let pathArrray = [];
  pathArrray.push(this.state.glowna);
  pathArrray.push(this.state.drinkList);
  
  return pathArrray;
}

addDrinktPath = () => {
  let pathArrray = [];
  pathArrray.push(this.state.glowna);
  pathArrray.push(this.state.addDrink);
  
  return pathArrray;
}

ingredientsListPath = () => {
  let pathArrray = [];
  pathArrray.push(this.state.glowna);
  pathArrray.push(this.state.ingredientsList);
  
  return pathArrray;
}

addIngredientPath = () => {
  let pathArrray = [];
  pathArrray.push(this.state.glowna);
  pathArrray.push(this.state.addIngredient);
  
  return pathArrray;
}

  render () {
    return (
      <div className="sidebar-nav">
      <div className="sidebar">
      <nav className="nav">
          <ul>
            
              <li><NavLink to="/Lista_Drinkow" exact onClick={e => this.props.setPath(this.drinkListPath())}>Lista Ulubionych</NavLink></li>
              <li><NavLink to="/Lista_Drinkow" exact onClick={e => this.props.setPath(this.drinkListPath())}>Lista Drinków</NavLink></li>
              <li><NavLink to="/Lista_Składnikow" exact onClick={e => this.props.setPath(this.ingredientsListPath())}>Lista Składników</NavLink></li>
              <li><NavLink to="/Dodaj_Drinka" exact onClick={e => this.props.setPath(this.addDrinktPath())}>Dodaj Drinka</NavLink></li>
              <li><NavLink to="/Dodaj_Skladnik" exact onClick={e => this.props.setPath(this.addIngredientPath())}>Dodaj Skladnik</NavLink></li>

              
          </ul>
      </nav>
  </div>
  </div>
    );
  }
}

export default Sidebar;