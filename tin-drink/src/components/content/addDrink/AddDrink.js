import React from 'react';
import './AddDrink.css';
import AllIngredients from './../ingredientList/AllIngredients'
import Validation from './../../helpers/Validation'
import './../Error.css'

class AddDrink extends React.Component {

    state = {
        apiMethod:"",
        selectedIngredient: "",
        selectedIngredientsList: [],
        drinkName: "",
        drinkTaste: "",
        drinkDesc: "",
        drinkVol: "",
        drinkId:"",
        file: "",
        photoFile: "",
        ingredientAmount: "",
        drinkNameError:"",
        selectedIngredientError: "",
        ingredientAmountError: "",
        numberOfIngredientsError: "",
        addDrinkError: ""

    }

    setSelectedIngredient = event => {
        let ingId = event.target.value;

        fetch(`http://localhost:8080/api/ingredients/${ingId}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                selectedIngredient: data,
            })
        });
    }

    handleChange = event => {
        console.log(event.target.type)
        if (event.target.type === "file") {
            const photoName = event.target.files[0].name ? event.target.files[0].name : null ;
            const photoFile = event.target.files[0] ? event.target.files[0] : null ;
            console.log(photoName)
            console.log(photoFile)
            this.setState({
                [event.target.name]: photoName,
                photoFile : photoFile
               
            })
        } else {
            const isCheckbox = event.target.type === "checkbox";
            console.log(event.target.name);
            this.setState({
                [event.target.name]: isCheckbox ? event.target.checked : event.target.value
            })
        }

    }

    handleAddIngredientButton = (e) => {
        e.preventDefault();
        let isError = 0;
        let selectedIng = this.state.selectedIngredientsList;
        const errors = {
            selectedIngredientError: "",
            ingredientAmountError: ""
        }
        isError = (errors.selectedIngredientError = Validation.validateRequiredField(this.state.selectedIngredient) || "") ? isError + 1 : isError
        isError = (errors.ingredientAmountError = Validation.validateRequiredField(this.state.ingredientAmount) || Validation.validateIsNumber(this.state.ingredientAmount) || Validation.validateRangeNumer(this.state.ingredientAmount, 0.1, 1000) || Validation.validateFloat(this.state.ingredientAmount) || "") ? isError + 1 : isError

        console.log(isError)
        if(errors.selectedIngredientError){
            errors.selectedIngredientError = true;
        } else {
            errors.selectedIngredientError = false;
        }
        if(isError === 0){
            console.log("NIBY OK")
            const amount = {
                ingredient: this.state.selectedIngredient,
                amount: this.state.ingredientAmount
            }
            selectedIng.push(amount)
            let vol = this.calculateDrinkVol()
            console.log(vol);
        this.setState({
            selectedIngredientsList: selectedIng,
            ingredientAmount: "",
            drinkVol: vol,
            ...errors
        })
        } else {
            this.setState({
                ...this.state,
                ...errors
            })
        }

    }

    handleAddDrinkButton = (e) => {
        e.preventDefault();
        console.log('handle buttons')
        let isError = false;
        let amount = {}
        const errors = {
            numberOfIngredientsError: "",
            drinkNameError: ""
        }

        isError = (errors.numberOfIngredientsError =  (this.state.selectedIngredientsList.length > 2) ? "" : "drink musi zawierać minimum 3 składniki") ? true : false
        isError = (errors.drinkNameError = Validation.validateRequiredField(this.state.drinkName) || Validation.validateMinLength(this.state.drinkName, 3) || Validation.validateIsString(this.state.drinkName) || "") ? true : false
    
        if(!isError){
             this.state.selectedIngredientsList.forEach(val => {
                amount[val.ingredient.id] = parseFloat(val.amount)
             })
             const drink = {
                name: this.state.drinkName,
                vol: this.state.drinkVol,
                taste: this.state.drinkTaste,
                price: 140,
                drinkDesc: this.state.drinkDesc,
                photoPath: this.state.file
            }

            const drinkData = {
                drink: drink,
                amount: amount
            }

            let url = this.state.drinkId ? `http://localhost:8080/api/drinks/${this.state.drinkId}` : 'http://localhost:8080/api/drinks'
            console.log(url)

            fetch(url, {
                 method: this.state.apiMethod,
                 headers: {"Content-Type":"application/json"},
                 body: JSON.stringify(drinkData)
            })
            .then(res =>{
                console.log(res)
                if(res.status === 200 || res.status === 201 || res.status === 409) {
                    if((res.status === 201 || res.status === 200) && this.state.file) {
                        console.log('dodaje fote')
                        let formData = new FormData();
                        formData.append("files",this.state.photoFile)
                        fetch('http://localhost:8080/api/drinks/photo', {
                            method: 'post',
                            body: formData
                        })
                    }
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

        } else {
            console.log("set state err")
            this.setState({
                ...errors
            })
        }
        
    }

    calculateDrinkVol = () => {
        let allIngredientsGrammage = 0;
        let alcoholGrammage = 0;
        this.state.selectedIngredientsList.forEach(ing => {
        allIngredientsGrammage += parseFloat(ing.amount);
        console.log(allIngredientsGrammage);
        console.log(ing);
            if(ing.ingredient.isAlc) {
                console.log(ing.ingredient.vol)
                console.log(ing.amount)
                alcoholGrammage += (parseFloat(ing.ingredient.vol)/100) * (parseFloat(ing.amount));
            }
        })
    
        let drinkvolume = this.round(alcoholGrammage/allIngredientsGrammage*100, 1);
        return drinkvolume
    }

    deleteIngredientFromDrink = (e, index) => {
        e.preventDefault();
        console.log(index)
        console.log(this.state.selectedIngredientsList)
        const helpArr = [...this.state.selectedIngredientsList]
        helpArr.splice(index, 1);
        this.setState({
            selectedIngredientsList: helpArr
        })
    }

    round = (n, k) => {
        var factor = Math.pow(10, k);
        return Math.round(n * factor) / factor;
      }

      componentDidMount() {
          if(this.props.location.id){
            fetch(`http://localhost:8080/api/drinks/${this.props.location.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    apiMethod: "PUT",
                    selectedIngredientsList: data.amounts,
                    drinkId: data.id,
                    drinkName: data.name,
                    drinkTaste: data.taste,
                    drinkDesc: data.drinkDesc,
                    drinkVol: "",
                    photoPath: data.photoPath

                })
            });
              console.log("EDYCJA DRINKA")
          } else {
              this.setState({
                  apiMethod: "POST"
              })
          }
      }

render() {
    console.log(this.state)
    return(
        <div className="adddrink">
            <div className="generalinformation">
                <label id="error-drinkname" className={"errors-text"}>{this.state.drinkNameError}</label>
                <input className={ this.state.drinkNameError ? "field-error" : ""} id="drinkname" type="text" name="drinkName" placeholder="Nazwa *" value={this.state.drinkName} onChange={this.handleChange}/>
                <label id="error-drinvalue" className="errors-text"></label>
                <input id="drinvalue" type="text" name="value" placeholder="Moc *" title="Wymagane liczbowa, maks 99% *" value={this.state.drinkVol} readOnly/>
                <input id="drinkt-taste" type="text" name="drinkTaste" placeholder="Smak" value={this.state.drinkTaste} onChange={this.handleChange}/>
                <textarea id="drinkdesc" name="drinkDesc" placeholder="Opis drinka" value={this.state.drinkDesc} onChange={this.handleChange}></textarea>
                <input id="drink-photo-file" type="file" name="file" onChange={this.handleChange}/>
                <input id="add-photo-button" className="add-photo-button" type="submit" value="Dodaj zdjecie" />
            </div>
            <AllIngredients onSelectIngredient={this.setSelectedIngredient.bind(this)} isError={this.state.selectedIngredientError}/>
            <div className="otherinfo">
                <label id="error-ingredient-qty" className="errors-text">{this.state.ingredientAmountError}</label>
                <input className={ this.state.ingredientAmountError ? "field-error" : ""} id="ingredient-qty" type="text" name="ingredientAmount" value={this.state.ingredientAmount} placeholder="Ilosc" onChange={this.handleChange}/>
                <input id="addIngredient-button" type="submit" value="Dodaj skladnik" onClick={e => this.handleAddIngredientButton(e)}/>
            </div>
            <div className="selectedingredients">
                <h3>Wybrane składniki</h3>
                <table className="ingredients-table">
                    <thead>
                        <tr>
                            <th>Składnik</th>
                            <th>Ilośc [g]</th>
                            <th>Akcja</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-ingredients"></tbody>
                    {this.state.selectedIngredientsList.map((i, index) => {
                        return (        
                        <tr>
                            <td>{i.ingredient.name}</td>            
                            <td>{i.amount}</td>            
                            <td className="actions">
                                <a href="#" onClick={(e) => this.deleteIngredientFromDrink(e, index)}>Usuń</a>
                            </td>            
                        </tr>)
                    })}
                </table>
                <label id="error-tbody-ingredients" className="errors-text">{this.state.numberOfIngredientsError}</label>
            </div>
            <div className="adddrinkbutton">     
                <input id="add-drink-button" type="submit" name="add-drink" value="Dodaj drinka" onClick={e => this.handleAddDrinkButton(e)}/> 
                <div className="error" id = "error">
                    {this.state.addDrinkError}
                </div>       
            </div>
        </div>
        
    )
}

}

export default AddDrink;