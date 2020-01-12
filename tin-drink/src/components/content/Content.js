import React from 'react'
import './Content.css'
import Sidebar from './sidebar/Sidebar'
import {BrowserRouter, NavLink, Route} from 'react-router-dom';
import DrinkList from './drinkList/DrinkList'
import IngredientList from './ingredientList/IngredientList'
import AddIngredient from './addIngredient/AddIngredient'
import OperationInformation from './OperationInformation'
import AddDrink from './addDrink/AddDrink'

function Content() {
    return (
        <BrowserRouter>
            <div className="content">
                <Route path="/" exact component={Sidebar} />
                <Route path="/Lista_Drinkow" exact component={DrinkList} />
                <Route path="/Lista_Składnikow" exact component={IngredientList} />
                <Route path="/Dodaj_Skladnik" exact component={AddIngredient} />
                <Route path="/info" exact component={OperationInformation} />
                <Route path="/Dodaj_Drinka" exact component={AddDrink} />
            </div>
        </BrowserRouter>
    )
}

export default Content;