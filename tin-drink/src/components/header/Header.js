import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css'

class Header extends React.Component {

    state = {
        helloString: "Gościu"
    }


    rerenderHeader = () => {
        this.forceUpdate();
    }

    // componentDidUpdate() {
    //     console.log(sessionStorage.length)
    //     if(sessionStorage.getItem('userName')) {
    //         this.setState({
    //             helloString: sessionStorage.getItem('userName')
    //         })
    //     }
    // }

    componentDidMount() {
        console.log(sessionStorage.length)
        if(sessionStorage.getItem('userName')) {
            this.setState({
                helloString: sessionStorage.getItem('userName')
            })
        }
    }

    render () {
        console.log('render header')
        return (
            <>
                <div className="header-limiter">
                    <h1> Witaj {this.state.helloString}</h1>
                    <ul>
                        <li><NavLink to="/Logowanie" exact>Zaloguj</NavLink></li>
                        <li><NavLink to="/Rejestracja" exact>Rejestracja</NavLink></li>
                    </ul>
                </div>
            </>
        )
    }
}



export default Header;