import React from 'react'
import './AddIngredient.css'
import Validation from './../../helpers/Validation'
import {useHistory} from 'react-router-dom';

class AddIngredient extends React.Component {

    state = {
        name: "",
        price: "",
        taste: "",
        vol: "",
        isAlco: false,
        isGas: false,
        nameerror: "",
        priceerror: "",
        tasteerror: "",
        volerror: "",
    }

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        console.log(event.target.name);
        this.setState({
            [event.target.name]: isCheckbox ? event.target.checked : event.target.value
        })
    }

    validate = () => {
        console.log('inside validate')
        let isError = false;
        const errors = {
            nameerror: "",
            priceerror: "",
            tasteerror: "",
            volerror: ""
        }

       isError = (errors.nameerror = Validation.validateRequiredField(this.state.name) || Validation.validateMinLength(this.state.name, 3) || Validation.validateIsString(this.state.name) || "") ? true : false
       isError = (errors.priceerror = Validation.validateRequiredField(this.state.price) || Validation.validateIsNumber(this.state.price) || Validation.validateFloat(this.state.price) || "") ? true : false
       isError = (errors.tasteerror = Validation.validateRequiredField(this.state.taste) || Validation.validateIsString(this.state.taste) || "") ? true : false
       if (this.state.isAlco) {
           isError = (errors.volerror = Validation.validateRequiredField(this.state.vol) || Validation.validateIsNumber(this.state.vol) || Validation.validateRangeNumer(this.state.vol, 0.1, 99) || Validation.validateFloat(this.state.price) || "") ? true : false
       }

       this.setState({
           ...this.state,
           ...errors
       })
       return isError;
    }

    onsubmit = e => {
        e.preventDefault();
        const err = this.validate();
        if(!err) {
            let jsonBody = {
                name: this.state.name,
                isAlc: this.state.isAlco,
                isGas: this.state.isGas,
                taste: this.state.taste,
                price: this.state.price,
                vol: this.state.vol
            }
            fetch('http://localhost:8080/api/ingredients', {
                 method: 'post',
                 headers: {"Content-Type":"application/json"},
                 body: JSON.stringify(jsonBody)
            })
            .then(res =>{
                if(res.status === 201 || res.status === 409) {
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
        }
    }


    render() {
        return (
            <div className="add-ingredient-nav">
                <div class="new-ingredient-data">
                    <h1> Dodaj Składnik</h1>   
                    <form id='ingredient-formId' action="#" onsubmit="return false">
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Nazwa *"
                            value={this.state.name}
                            onChange={this.handleChange}
                        /><span id="error-name" className="errors-text">{this.state.nameerror}</span>
                        <input 
                            type="text" 
                            id="price" 
                            name="price" 
                            placeholder="Srednia cena *"
                            value={this.state.price}
                            onChange={this.handleChange}
                        /><span id="error-price" className="errors-text">{this.state.priceerror}</span>
                        <input 
                            type="text" 
                            id="taste" 
                            name="taste" 
                            placeholder="Smak *"
                            value={this.state.taste}
                            onChange={this.handleChange}
                        /><span id="error-taste" className="errors-text">{this.state.tasteerror}</span>
                        <input 
                            type="text" 
                            id="vol" 
                            name="vol" 
                            placeholder="Moc" 
                            disabled={this.state.isAlco ? false : true}
                            value={this.state.vol}
                            onChange={this.handleChange}
                        /><span id="error-vol" className="errors-text">{this.state.volerror}</span>
                        <br></br>
                        <label for="isAlco"> Czy Alkohol </label>
                        <input 
                            type="checkbox" 
                            id="isAlco"
                            name="isAlco"
                            checked={this.state.isAlco}
                            onChange={this.handleChange}
                        /> 
                        <br></br>
                        <label for="isGas"> Czy Gazowany </label>
                        <input 
                            type="checkbox" 
                            id="isGas"
                            name="isGas"
                            checked={this.state.isGas}
                            onChange={this.handleChange}
                        />
                        <br></br>
                        <input 
                            id="form-submit" 
                            type="submit" 
                            name="signup-button" 
                            value="Dodaj SKładnik"
                            onClick={e => this.onsubmit(e)}
                        />
                        <div class="error" id = "error">
                            Formularz zawiera błędy
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddIngredient;