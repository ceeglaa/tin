import React from 'react';
import './IngredientDetails.css'

class IngredientDeatils extends React.Component { 

    state = {
        ingredient: ''
    }

    getIngredientDetails(id){
        console.log(id)
        fetch(`http://localhost:8080/api/ingredients/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                ingredient: data
            })
        });
    }

    componentDidUpdate(){
        console.log(" DID UPDATE ING DETAILS")
        console.log(this.props.id !== '')
        console.log(this.props)
        console.log(this.state.ingredient.id )
        if(this.props.id !== '' && parseInt(this.props.id) && parseInt(this.props.id) !== this.state.ingredient.id ) {
             this.getIngredientDetails(this.props.id);
        }
    }

    render() {
        console.log(this.state.ingredient);
        return(
        <>
             <div class="ingredient-details" >
                <div id="ingredient-details">
                    <h2>Dane Składnika</h2>
                    <div class="property">Nazwa</div> <div class="property-value">{this.state.ingredient.name}</div>
                    <div class="property">Średnia cena</div> <div class="property-value">{this.state.ingredient.price}</div>
                    <div class="property">Czy alkohol</div><div class="property-value"> <input type="checkbox" disabled="disabled" checked={Boolean(this.state.ingredient.isAlc)}/> </div>
                    <div class="property">Moc</div> <div class="property-value">{this.state.ingredient.vol ? this.state.ingredient.vol : "0"} %</div>
                    <div class="property">Smak</div> <div class="property-value">{this.state.ingredient.taste}</div>
                    <div class="property">Czy gazowany</div> <div class="property-value"> <input type="checkbox" disabled="disabled" checked={Boolean(this.state.ingredient.isGas)}/> </div>
                </div>
                <input id="edit-ingredient-button" type="submit" value="Edytuj Składnik"/>
                <input id="delete-ingredient-button" type="submit" value="Usuń Składnik"/>
            </div>
        </>
    )
    }

}

export default IngredientDeatils;