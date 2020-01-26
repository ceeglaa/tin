import React from 'react';
import './IngredientDetails.css'

class IngredientDeatils extends React.Component { 

    state = {
        ingredient: ''
    }

    getIngredientDetails(id){
        fetch(`http://localhost:8080/api/ingredients/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                ingredient: data
            })
        });
    }

    componentDidUpdate(){
        if(this.props.id !== '' && parseInt(this.props.id) && parseInt(this.props.id) !== this.state.ingredient.id ) {
             this.getIngredientDetails(this.props.id);
        }
    }

    render() {
        return(
        <>
             <div className="ingredient-details" >
                <div id="ingredient-details">
                    <h2>Dane Składnika</h2>
                    <div className="property">Nazwa</div> <div class="property-value">{this.state.ingredient.name}</div>
                    <div className="property">Średnia cena</div> <div class="property-value">{this.state.ingredient.price}</div>
                    <div className="property">Czy alkohol</div><div class="property-value"> <input type="checkbox" disabled="disabled" checked={Boolean(this.state.ingredient.isAlc)}/> </div>
                    <div className="property">Moc</div> <div class="property-value">{this.state.ingredient.vol ? this.state.ingredient.vol : "0"} %</div>
                    <div className="property">Smak</div> <div class="property-value">{this.state.ingredient.taste}</div>
                    <div className="property">Czy gazowany</div> <div class="property-value"> <input type="checkbox" disabled="disabled" checked={Boolean(this.state.ingredient.isGas)}/> </div>
                </div>
                <input id="edit-ingredient-button" type="submit" value="Edytuj Składnik" onClick={e => this.props.editFunction(e)}/>
                <input id="delete-ingredient-button" type="submit" value="Usuń Składnik" onClick={e => this.props.deleteFunction(e)}/>
            </div>
        </>
    )
    }

}

export default IngredientDeatils;