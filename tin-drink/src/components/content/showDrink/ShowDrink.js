import React from 'react'
import './ShowDrink.css'

class ShowDrink extends React.Component {

    state = {
        selectedIngredient: "",
        drinkName: "",
        drinkTaste: "",
        drinkDesc: "",
        drinkVol: "",
        drinkId:"",
        photoFile: "",
        ingredientAmount: "",
        drinkNameError:"",
        selectedIngredientError: "",
        ingredientAmountError: "",
        numberOfIngredientsError: "",
        addDrinkError: ""

    }

    handleBackButton = () => {
        this.props.history.push({
            pathname: '/Lista_Drinkow',
        })
    }

    componentDidMount() {
        if(this.props.location.id){
          fetch(`http://localhost:8080/api/drinks/${this.props.location.id}`)
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({
                  selectedIngredientsList: data.amounts,
                  drinkName: data.name,
                  drinkTaste: data.taste,
                  drinkDesc: data.drinkDesc,
                  drinkVol: data.vol,
                  photoPath: data.photoPath

              })
          });
        }
    }

    render () {
        return (
            <>
            <div id="single-drink" className="show-single-drink">
                <div id="drink-photo" class="drink-photo">
                    <img src={`http://localhost:8080/images/${this.state.photoPath}`} onClick={(e) => this.showDrink()}/>
                </div>
                <div className="drink-info">
                    <div id="drink-name" className="drink-name">
                       {this.state.drinkName}
                    </div>
                    <div id="drink-desc" className="drink-desc">
                       {this.state.drinkDesc}
                    </div>
                    <div id="drink-author" className="drink-author">
                        Autor: Adrian Cegłowski
                    </div>
                    <div id="drink-vol" class="drink-vol">
                        Moc: ${this.state.drinkVol}%
                    </div>
                </div>
                <input className="show-ingredient-button" id="show-ingredient-button" type="submit" value="powrót" onClick={e => this.handleBackButton()}/>
            </div>
            </>
        )
    }
}

export default ShowDrink;