import React from 'react';
import './SingleDrink.css';

class SingleDrink extends React.Component {

    showDrink = () => {
        console.log('show drink')
    }

    
    render () {
        console.log(this.props);
        return(
            <div id="single-drink" class="single-drink">
                <div id="drink-photo" class="drink-photo">
                    <img src={`http://localhost:8080/images/${this.props.drink.photoPath}`} onClick={(e) => this.showDrink()}/>
                </div>
                <div id="drink-name" className="drink-name">
                    {this.props.drink.name}
                </div>
                <div id="drink-author" className="drink-author">
                    Autor: Adrian Cegłowski
                </div>
                <div id="drink-vol" class="drink-vol">
                    Moc: ${this.props.drink.vol}%
                </div>
                    <input id="edit-ingredient-button" type="submit" value="Edytuj drinka" onClick={ e => this.props.functionEdit(e, this.props.drink.id)}></input><span> </span>
                    <input id="delete-ingredient-button" type="submit" value="Usuń drinka" onClick={e => this.props.functionDelete(e, this.props.drink.id)}/>
                    <br></br>
                    <input className="show-ingredient-button" id="show-ingredient-button" type="submit" value="Zobacz drinka" onClick={e => this.props.functionShow(e, this.props.drink.id)}/>
                    <input className="show-ingredient-button" id="show-ingredient-button" type="submit" value="Dodaj do ulub." onClick={e => this.props.functionAddFavourite(this.props.drink.id)}/>
            </div>
        )
    }
}

export default SingleDrink;