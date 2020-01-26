import React from 'react'
import './Register.css'
import './../Error.css'
import Validation from './../../helpers/Validation'

class Register extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        rePassword: "",
        birthDate: "",
        firstNameError: "",
        lastNameError: "",
        userNameError: "",
        emailError: "",
        passwordError: "",
        rePasswordError: "",
        birthDateError: "",
        isError: 0
    }


    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        console.log(event.target.name);
        this.setState({
            [event.target.name]: isCheckbox ? event.target.checked : event.target.value
        })
    }

    onFocusDate = e => {
        console.log(e);
        e.setState({
            type: 'date'
          });
    }

    handleRegisterSubmit = e => {
        e.preventDefault();
        let err = 0;

        const errors = {
            firstNameError: "",
            lastNameError: "",
            userNameError: "",
            emailError: "",
            passwordError: "",
            rePasswordError: "",
            birthDateError: ""
        }

        err = (errors.firstNameError = Validation.validateRequiredField(this.state.firstName) || Validation.validateIsString(this.state.firstName) || "") ? err + 1 : err
        err = (errors.lastNameError = Validation.validateRequiredField(this.state.lastName) || Validation.validateIsString(this.state.lastName) || "") ? err + 1 : err
        err = (errors.userNameError = Validation.validateRequiredField(this.state.userName) || Validation.validateIsString(this.state.userName) || Validation.validateMinLength(this.state.userName, 3) || "") ? err + 1 : err
        err = (errors.emailError = Validation.validateRequiredField(this.state.email) || Validation.validateEmail(this.state.email) || "") ? err + 1 : err
        err = (errors.passwordError = Validation.validateRequiredField(this.state.password) || Validation.validateMinLength(this.state.password, 8) || Validation.validatePassword(this.state.password) || "") ? err + 1 : err
        err = (errors.rePasswordError = Validation.validateRequiredField(this.state.rePassword) || Validation.validateRePass(this.state.password, this.state.rePassword) || "") ? err + 1 : err
        err = (errors.birthDateError = Validation.validateRequiredField(this.state.birthDate) || errors.birthDateError || Validation.validateIsEighteen(this.state.birthDate) || "") ? err + 1 : err

        if (err === 0 ) {

            let jsonBody = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.userName,
                password: this.state.password,
                email: this.state.email
            }

            fetch(`http://localhost:8080/signup`, {
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
               this.props.history.push({
                   pathname: '/info',
                   text: data
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
                    <h1> Rejestracja </h1>   
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            placeholder="Imie *"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            className={ this.state.firstNameError ? "field-error" : ""}
                            /><span id="error-name" className="errors-text">{this.state.firstNameError}</span>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            placeholder="Nazwisko *"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            className={ this.state.lastNameError ? "field-error" : ""}
                        /><span id="error-price" className="errors-text">{this.state.lastNameError}</span>
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
                            type="text" 
                            id="email" 
                            name="email" 
                            placeholder="Email" 
                            value={this.state.email}
                            onChange={this.handleChange}
                            className={ this.state.emailError ? "field-error" : ""}
                        /><span id="error-vol" className="errors-text">{this.state.emailError}</span>
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
                            type="password" 
                            id="rePassword" 
                            name="rePassword" 
                            placeholder="Repeat password" 
                            value={this.state.rePassword}
                            onChange={this.handleChange}
                            className={ this.state.rePasswordError ? "field-error" : ""}
                        /><span id="error-vol" className="errors-text">{this.state.rePasswordError}</span>
                        <input
                            type="text" 
                            id="birthDate" 
                            name="birthDate" 
                            placeholder="Data urodzenia" 
                            value={this.state.birthDate}
                            onChange={this.handleChange}
                            onFocus={(e) => e.target.type = 'date'}
                            className={ this.state.birthDateError ? "field-error" : ""}
                        /><span id="error-vol" className="errors-text">{this.state.birthDateError}</span>
                        <input 
                            id="form-submit" 
                            type="submit" 
                            name="signup-button" 
                            value="Zarejestruj"
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

export default Register;