import React from 'react';
import './SingleDrink.css';

function SingleDrink(props) {

    console.log(props);
    return(
        <div id="single-drink" class="single-drink">
            <div id="drink-photo" class="drink-photo">
                <img src={props.drink.photoPath}/>
            </div>
            <div id="drink-name" className="drink-name">
                {props.drink.name}
            </div>
            <div id="drink-author" className="drink-author">
                Autor: Adrian Cegłowski
            </div>
            <div id="drink-vol" class="drink-vol">
                Moc: ${props.drink.vol}%
            </div>
                <input id="edit-ingredient-button" type="submit" value="Edytuj drinka" onClick={props.function}/><span> </span>
                <input id="delete-ingredient-button" type="submit" value="Usuń drinka" onClick={props.function}/>
        </div>
    )
}

export default SingleDrink;