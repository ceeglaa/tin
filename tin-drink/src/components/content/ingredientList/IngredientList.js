import React from 'react'

class IngredientList extends React.Component { 

    state = {
        ingredients: []
    }

    componentDidMount(){
        console.log('DID MOUNT')
        fetch("http://localhost:8080/api/ingredients")
        .then(res => res.json())
        .then(data => {
            this.setState({
                ingredients: data,

            })
        });
    }

    render() {
        console.log(this.state.ingredients)
        return(
            <>
                <div class="all-ingredients">
                    <input type="text" name="name" placeholder="Nazwa składnika"/>
                    <label id="error-ingredients-list" class="errors-text"></label>
                    <select id="ingredients-list-check" class="ingerdients" name="sometext" onchange="onSelectIngredient()"  multiple>
                    {this.state.ingredients.map((i) => {
                        return <option value={i.id}>{i.name}</option>
                    })}
                    </select>
                </div>
            </>
        )
    }
}

export default IngredientList;