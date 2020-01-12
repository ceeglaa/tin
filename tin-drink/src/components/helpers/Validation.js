class Validation {

static validateRequiredField = (element) => {
    return (!element)  ? "wybrane pole jest wymagane" : false
}

static validateMinLength = (element, number) => {
    return  (element.length < number) ? `minimum ${number} znaków` : false
}

static validateIsString = element => {
    let lettersRegex = /^[a-zA-Z0-9AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż\s]*$/;

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

}

module.exports = Validation;