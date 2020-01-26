import React from 'react';
import {NavLink} from 'react-router-dom';
import './OperationInformation.css'

class OperationInformation extends React.Component{

    state = {
        glowna: {
            link: '/',
            title: 'Strona główna'
        }
    }

    render() {
        return(
        <>
            <div className="back-to-main">
                <h1>{this.props.location.text}</h1>
                <NavLink to="/" exact>Powrót do głównej</NavLink>
            </div>
        </>
        )
}
}

export default OperationInformation;