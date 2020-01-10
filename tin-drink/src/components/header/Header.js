import React from 'react';
import './Header.css'

const Header = () => {
    return (
        <>
            <div className="header-limiter">
                <h1> Witaj Gościu / Użytkowniku</h1>
                <ul>
                    <li><a href="#">Zaloguj</a></li>
                    <li><a href="#">Rejestracja</a></li>
                </ul>
            </div>
        </>
    )
}

export default Header;