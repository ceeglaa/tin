import React from 'react';
import './../Error.css'

class AllIngredients extends React.Component {

    state = {
        ingredients: [],
        displayedIngredients: [],
        selectedIngredient: '',
        errorMsg: 'wybierz składnik z listy',
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
        console.log(this.state)
        console.log(this.props)
        return (
        <div className="all-ingredients">
            <input type="text" name="name" placeholder="Nazwa składnika" autoComplete="off" onInput={event => this.filterInputHandler(event.target.value)}/>
            <label id="error-ingredients-list" className="errors-text">{this.props.isError && this.state.errorMsg}</label>
            <select id="ingredients-list-check" className={ this.props.isError === true ? "ingerdients field-error" : "ingerdients"} name="sometext" onChange={e => this.props.onSelectIngredient(e)}  multiple>
            {this.state.displayedIngredients.map((i) => {
                return <option value={i.id} key={i.id}>{i.name}</option>
            })}
            </select>
        </div>
        )
    }
}

export default AllIngredients;