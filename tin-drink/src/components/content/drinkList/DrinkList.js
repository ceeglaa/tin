import React from 'react';
import SingleDrink from './SingleDrink'
import './DrinkList.css'

class DrinkList extends React.Component {

    state = {
        drinks: [],
        visibleDrinks: [],
        pivot: '',
        visibleNextButton: '',
        visiblePrevButton:''
    }

    test = () => {
        console.log('arbert')
    }

    fetchData = () => {
        fetch("http://localhost:8080/api/drinks")
        .then(res => res.json())
        .then(data => console.log(data));
    }

   getVisibleDrinks = (drinks, pivot) => {
        let visibleDrinksArray = []
        let k = pivot - 1;
        
        if (pivot+2 <= drinks.length) {
            for(let i = 0; i < 3; i++) {
                visibleDrinksArray.push(drinks[k]);
                k++;
            }
        } else {
            visibleDrinksArray = drinks.slice(pivot-1, drinks.length);
        }

        return visibleDrinksArray;
    }

    handleNextPrevButton = (type) => {
        const {drinks, pivot} = this.state;
        let newPivot;
        if (type === 'next') {
            newPivot = pivot + 3;
        } else if (type === 'prev'){
            newPivot = pivot - 3;
        }
        
        console.log(newPivot)
        console.log(drinks.length)
        this.setState({
            visibleDrinks: this.getVisibleDrinks(drinks, newPivot),
            pivot: newPivot,
            visibleNextButton: (newPivot + 3 > drinks.length) ? false : true,
            visiblePrevButton: (newPivot <= 1) ? false : true
        })
    }


    componentDidMount(){
        console.log('DID MOUNT')
        fetch("http://localhost:8080/api/drinks")
        .then(res => res.json())
        .then(data => {
            this.setState({
                drinks: data,
                visibleDrinks: this.getVisibleDrinks(data, 1),
                pivot: 1,
                visibleNextButton: (data.length > 3) ? true : false,
                visiblePrevButton: false

            })
        });
    }

    render() {
        console.log("render");
        return(
        <>
            <div className="drink-list">
                {this.state.visibleDrinks.map((drink) => {
                    return <SingleDrink drink={drink} function={this.test.bind(this)} key={drink.id}/>
                })}
            </div>
            <div id="change-drinks-buttons" class="change-drinks-buttons">
              { this.state.visiblePrevButton &&  <a href="#" id="prev-button" class="prev-next-buttons round" onClick={() => this.handleNextPrevButton('prev')}> &#8249; </a>}
              { this.state.visibleNextButton &&  <a href="#" id="next-button" class="prev-next-buttons round" onClick={() => this.handleNextPrevButton('next')}> &#8250; </a>}
            </div>
        </>
    )
    }
        

}
export default DrinkList;