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
        // let formData = new FormData();
        // formData.append("files",value.files[0])
        // console.log(value.files[0])
        // fetch('http://localhost:8080/api/drinks/photo', {
        //     method: 'post',
        //     body: formData
        // })
        let filteredIngredientArray = this.state.ingredients.filter(ing => {return ing.name.toLowerCase().includes(value.toLowerCase())});
        this.setState({
            displayedIngredients: filteredIngredientArray
        })
    }

    render() {
        console.log(this.state.ingredients)
        return(
            <>
            <div className="ingredients-list">
                <AllIngredients onSelectIngredient={this.onSelectIngredient.bind(this)}/>
                <div className="ingredients-details">
                    <IngredientDetails id={this.state.selectedIngredient}/>
                </div>
            </div>

            </>
        )
    }
}

export default IngredientList;