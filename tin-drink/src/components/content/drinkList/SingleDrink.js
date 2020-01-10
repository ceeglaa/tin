import React from 'react';

function SingleDrink(props) {

    console.log(props);
    return(
        <div id="single-drink" className="single-drink">
        <div id="drink-photo" className="drink-photo">
            <img src={props.photoPath}/>
        </div>
        <div id="drink-name" className="drink-name">
            ${props.name}
        </div>
        <div id="drink-author" className="drink-author">
            Autor: Adrian Cegłowski
        </div>
        <div id="drink-vol" className="drink-vol">
            Moc: ${props.vol}%
        </div>
            <input id="edit-ingredient-button" type="submit" value="Edytuj drinka" onClick={props.function}/>
            <input id="delete-ingredient-button" type="submit" value="Usuń drinka" onClick="deleteClickedDrink(${d.id})"/>
    </div>
    )
}

export default SingleDrink;