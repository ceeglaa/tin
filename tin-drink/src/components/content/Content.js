import React from 'react'
import './Content.css'
import Sidebar from './sidebar/Sidebar'
import {BrowserRouter, Route} from 'react-router-dom';
import DrinkList from './drinkList/DrinkList'
import IngredientList from './ingredientList/IngredientList'
import AddIngredient from './addIngredient/AddIngredient'
import OperationInformation from './OperationInformation'
import AddDrink from './addDrink/AddDrink'
import Register from './loginRegister/Register'
import Login from './loginRegister/Login'

function Content(props) {
    console.log("render contect")
    return (
            <div className="content">
                <Route path="/" exact component={Sidebar} />
                <Route path="/Lista_Drinkow" exact component={DrinkList} />
                <Route path="/Lista_Składnikow" exact component={IngredientList} />
                <Route path="/Dodaj_Skladnik" exact component={AddIngredient} />
                <Route path="/info" exact component={OperationInformation} />
                <Route path="/Dodaj_Drinka" exact component={AddDrink} />
                <Route path="/Rejestracja" exact component={Register} />
                <Route path="/Logowanie" exact component={Login} />
            </div>
    )
}

export default Content;