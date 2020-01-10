import React from 'react';
import SingleDrink from './SingleDrink'

class DrinkList extends React.Component {

    state = {
        drinks: []
    }

    test = () => {
        console.log('arbert')
    }

    test = () => {
        var x =8;
        console.log(ddf);

        (func)
    }

    fetchData = () => {
        fetch("http://localhost:8080/api/drinks")
        .then(res => res.json())
        .then(data => console.log(data));
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/drinks")
        .then(res => res.json())
        .then(data => {
            this.setState({
                drinks: data
            })
        });
    }

    render() {
        this.fetchData();
        console.log("render");
        return(
        <div>
            {this.state.drinks.map((drink) => {
                return <SingleDrink drink={drink} function={this.test.bind(this)}/>
            })}
        </div>
    )
    }
        

}
export default DrinkList;