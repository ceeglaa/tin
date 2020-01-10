import React from 'react'
import './Content.css'
import Sidebar from './sidebar/Sidebar'
import {BrowserRouter, NavLink, Route} from 'react-router-dom';
import DrinkList from './drinkList/DrinkList'
import IngredientList from './ingredientList/IngredientList'

function Content() {
    return (
        <BrowserRouter>
            <div className="content-nav">
                <div className="sidebar-pos">
                    {/* <Route path="/" exact component={Sidebar} /> */}
                    <IngredientList />
                </div>
            </div>
            <div className="content">
                <Route path="/Lista_Drinkow" exact component={DrinkList} />
            </div>
        </BrowserRouter>
    )
}

export default Content;