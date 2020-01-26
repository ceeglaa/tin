import React from 'react';
import Validation from './../../helpers/Validation'

class Login extends React.Component {

    state = {
        userName: "",
        password: "",
        userNameError: "",
        passwordError: "",
        isError: 0
    }

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        console.log(event.target.name);
        this.setState({
            [event.target.name]: isCheckbox ? event.target.checked : event.target.value
        })
    }

    handleRegisterSubmit = e => {
        e.preventDefault();
        let err = 0;

        const errors = {
            userNameError: "",
            passwordError: "",
        }

        err = (errors.userNameError = Validation.validateRequiredField(this.state.userName) || Validation.validateIsString(this.state.userName) || Validation.validateMinLength(this.state.userName, 3) || "") ? err + 1 : err
        err = (errors.passwordError = Validation.validateRequiredField(this.state.password) || Validation.validateMinLength(this.state.password, 8) || Validation.validatePassword(this.state.password) || "") ? err + 1 : err
    
        if (err === 0 ) {

            let jsonBody = {
                userName: this.state.userName,
                password: this.state.password,
            }

            fetch(`http://localhost:8080/signin`, {
                method: 'POST', 
                headers: {
                    "Content-Type":"application/json"
                   },
                body: JSON.stringify(jsonBody)
           })
           .then(res =>{
               if(res.status === 200 || res.status === 201 || res.status === 409) {
                   return res.text()
               } else {
                   return "Wystąpił nieoczekiwany błąd. Spróbuj ponownie"
               }
           })
           .then(data => {
                let response = JSON.parse(data)
                sessionStorage.setItem('token', response.token)
                sessionStorage.setItem('roles', response.role)
                sessionStorage.setItem('userName', response.username)
                // this.props.render();
                console.log(this.props)
                this.props.history.push({
                    pathname: "/"
                })
           })
        } else {
            this.setState({
                ...errors,
                isError: err
            })
        }

    }

    render() {
        console.log('RENDER REGIST')
        return (
            <div className="registration-nav">
                <div class="registration">
                    <h1> Logowanie </h1>   
                        <input 
                            type="text" 
                            id="userName" 
                            name="userName" 
                            placeholder="User Name *"
                            value={this.state.userName}
                            onChange={this.handleChange}
                            className={ this.state.userNameError ? "field-error" : ""}
                        /><span id="error-taste" className="errors-text">{this.state.userNameError}</span>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Password" 
                            value={this.state.password}
                            onChange={this.handleChange}
                            className={ this.state.passwordError ? "field-error" : ""}
                        /><span id="error-vol" className="errors-text">{this.state.passwordError}</span>
                        <input 
                            id="form-submit" 
                            type="submit" 
                            name="signup-button" 
                            value="Zaloguj"
                            onClick={e => this.handleRegisterSubmit(e)}
                        />
                        <div class="error" id = "error">
                        { this.state.birthDateError ? "Formularz zawiera błędy" : ""}
                        </div>
                </div>
            </div>
        )
    }    
}

export default Login;