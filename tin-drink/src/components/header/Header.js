import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css'

class Header extends React.Component {

    state = {
        helloString: "Gościu",
        isLogged: false
    }


    rerenderHeader = () => {
        if(localStorage.getItem('userName')) {
            this.setState({
                helloString: localStorage.getItem('userName'),
                isLogged: true
            })
        }
    }

    handleLogOut = () => {
        localStorage.clear();
        this.setState({
            helloString: "Gościu",
            isLogged: false
        })
    }

    componentDidMount() {
        if(localStorage.getItem('userName')) {
            this.setState({
                helloString: localStorage.getItem('userName'),
                isLogged: true
            })
        }
    }

    componentDidUpdate() {
        if(localStorage.getItem('userName') && localStorage.getItem('userName')!==this.state.helloString) {
            this.setState({
                helloString: localStorage.getItem('userName'),
                isLogged: true
            })
        }
    }

    render () {
        console.log('render header')
        return (
            <>
                <div className="header-limiter">
                    <h1> Witaj {this.state.helloString}</h1>
                    {
                        this.state.isLogged ?
                            <ul>
                                <li><NavLink to="" onClick={e => this.handleLogOut()}>Wyloguj</NavLink></li>
                            </ul> : 
                            <ul>
                                <li><NavLink to="/Logowanie" exact>Zaloguj</NavLink></li>
                                <li><NavLink to="/Rejestracja" exact>Rejestracja</NavLink></li>
                                
                            </ul>
                    }

                </div>
            </>
        )
    }
}



export default Header;