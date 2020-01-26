class Validation {

    static validateRequiredField = (element) => {
        console.log(element);
        return (!element)  ? "wybrane pole jest wymagane" : false
    }

    static validateMinLength = (element, number) => {
        return  (element.length < number) ? `minimum ${number} znaków` : false
    }

    static validateIsString = element => {
        let lettersRegex = /^[a-zA-Z0-9ĄąĆćĘęŁłŃńÓóPŚśŹźŻż\s]*$/;

        return (!lettersRegex.test(String(element).toLowerCase())) ? 'Nazwa moze zawierać tylko litery i cyfry' : false
    }

    static validateIsNumber = element => {
        
        return (!parseFloat(element)) ? 'musi być liczba' : false
    }

    static validateFloat = element => {
        let onlyDotregex = /^[0-9.]+$/
        return (!onlyDotregex.test(String(element))) ? 'Kropka zamiast przecinka w liczbie' : false
    }

    static validateRangeNumer = (element, min, max) => {
        return (min <= parseFloat(element) && parseFloat(element) <= max ) ? false : `wartość z zakresu ${min} - ${max}`
    }

    static validateEmail = email => {
        let re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return (!re.test(String(email).toLowerCase())) ? "niewłaściwy email" : false
    }

    static validatePassword = pass => {
        let re = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/
        return (!re.test(pass)) ? "8 znakow, mala i duza litera, cyfa, znak specjalny" : false
    }

    static validateRePass = (repass, pass) => {
        
        return (pass !== repass) ? " hasła nie są takie same" : false 
    }

    static validateIsEighteen = date => {
        let birthDate = new Date(date);
        return ((new Date(birthDate.getFullYear()+18, birthDate.getMonth()-1, birthDate.getDay())) <= new Date()) ? false : "tylko pełnoletni uzytkownicy"
    }

}

module.exports = Validation;