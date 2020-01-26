import React from 'react'
import './IngredienList.css'
import IngredientDetails from './IngredientDetails'
import AllIngredients from './AllIngredients'

class IngredientList extends React.Component { 

    state = {
        ingredients: [],
        displayedIngredients: [],
        selectedIngredient: ''
    }

    onSelectIngredient = event => {
        this.setState({
            selectedIngredient: event.target.value
        })
    }

    handleEditButton = e => {
        e.preventDefault();
        if(this.state.selectedIngredient) {
            this.props.history.push({
                pathname: '/Dodaj_Skladnik',
                id: this.state.selectedIngredient
            })
        }
    }

    handleDeleteButton = e => {
        e.preventDefault();
        console.log('USUWAM SKLADNIER')
        if(this.state.selectedIngredient) {
            fetch(`http://localhost:8080/api/ingredients/${this.state.selectedIngredient}`, {
                method: 'DELETE',
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json'
                },
            })
            .then(res =>{
                if(res.status === 200 || res.status === 409) {
                    return res.text()
                } else {
                    return "Wystąpił nieoczekiwany błąd. Spróbuj ponownie"
                }
            })
            .then(data => {
                this.props.history.push({
                    pathname: '/info',
                    text: data
                })
            })
            .catch(err => {
                this.props.history.push({
                    pathname: '/info',
                    text: "Opcaj tylko dla zalogowanych uzytkowników"
                })
            });
    }
    }

    componentDidMount(){
        console.log('DID MOUNT')
        fetch("http://localhost:8080/api/ingredients")
        .then(res => res.json())
        .then(data => {
            this.setState({
                ingredients: data,
                displayedIngredients: data
            })
        });
    }

    filterInputHandler = value => {
        let filteredIngredientArray = this.state.ingredients.filter(ing => {return ing.name.toLowerCase().includes(value.toLowerCase())});
        this.setState({
            displayedIngredients: filteredIngredientArray
        })
    }

    render() {
        console.log(this.state.selectedIngredient)
        return(
            <>
            <div className="ingredients-list">
                <AllIngredients onSelectIngredient={this.onSelectIngredient.bind(this)}/>
                <div className="ingredients-details">
                    <IngredientDetails id={this.state.selectedIngredient} editFunction={this.handleEditButton.bind(this)} deleteFunction={this.handleDeleteButton.bind(this)}/>
                </div>
            </div>

            </>
        )
    }
}

export default IngredientList;