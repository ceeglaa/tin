const ingredientQtyValidation = 'ingredient-qty';
const ingredientListValidation = 'ingredients-list';
const ingredientTableValidation = 'tbody-ingredients';
const drinkNameValidation = 'drinkname';
const ingredientNameValidation = 'name';
const ingredientPriceValidation ='price';
const ingredientTasteValidation = 'taste';
const ingredientVolumeValidation = 'vol';
const ingredientIsAlcoValidation = 'isAlco';

const validateAddIngredient = callback => {
    let errors = 0;
    if(!validateIngredientQty(ingredientQtyValidation)) {
        errors ++;
    }
    if(!validateSelectedIngredient(ingredientListValidation)) {
        errors ++;
    }

    if (!errors) {
        callback()
    }
    
}

const validateAddEditDrink = (callback, apiCall, drinkId) => {
    let errors = 0;
    if(!validateAddedIngredientsAmount(ingredientTableValidation)) {
        errors ++
    }

    if(!validateRequiredField(drinkNameValidation)) {
        errors ++
    }

    if (!errors) {
        callback(apiCall, drinkId)
    }
}

const validateCreateIngredient = (callback, apiCall) => {
    let errors = 0;
    if(!validateRequiredField(ingredientNameValidation) || !validateMinLength(ingredientNameValidation, 3) || !validateIsString(ingredientNameValidation)) {
        console.log('name')
        errors++;
    }

    if(!validateRequiredField(ingredientPriceValidation) || !validateIsNumber(ingredientPriceValidation)) {
        console.log('price')
        errors++;
    }

    if(!validateRequiredField(ingredientTasteValidation) || !validateIsString(ingredientTasteValidation)) {
        console.log('taste')
        errors++;
    }

    if(isCheckboxChecked(ingredientIsAlcoValidation)) {
        if(!validateRequiredField(ingredientVolumeValidation) || !validateIsNumber(ingredientVolumeValidation) ) {
            console.log('vol')
            errors ++;
        }
    }

    console.log(errors);

    if(!errors) {
        console.log('brak bledow')
        callback(apiCall);
    }
}


const validateIngredientQty = element => {
    field = document.getElementById(element)
    qty = field.value;
    errorText = document.getElementById('error-'+element);
    if(qty === '') {
        errorText.innerHTML = "Pole jest wymagane";
        showFieldError(element);
        return false;
    } else if(!parseFloat(qty)) {
        errorText.innerHTML = "Tylko wartości liczbowe (gramy)";
        showFieldError(element);
        return false;
    } else {
        errorText.innerHTML = "";
        hideFieldError(element);
        return true;
    }
}

const validateSelectedIngredient = element => {
    list = document.getElementById(element);
    errorText = document.getElementById('error-'+element);
    if(!list.options[list.selectedIndex]) {
        errorText.innerHTML = "Wybierz składnik z listy";
        showFieldError(element);
        return false;
    } else {
        errorText.innerHTML = "";
        hideFieldError(element);
        return true;
    }
    
}

const validateAddedIngredientsAmount = element => {
    console.log('sprawdza ilosc skladnikow');
    ingAmount = document.getElementById(element).rows.length;
    console.log('ilosc skladnikow');
    console.log(ingAmount);
    if (ingAmount < 3) {
        showTextError(element, 'drink musi zawierać minimum 3 składniki')
        return false;
    } else {
        hideTextError(element);
        return true;
    }
}

const validateIsNumber = element => {
    let fieldValue = document.getElementById(element).value;

    if(!parseFloat(fieldValue)) {
        showTextError(element, 'cena musi być liczbą');
        showFieldError(element);
        return false;
    } else {
        hideFieldError(element);
        hideTextError(element);
        return true;
    }
}

const validateIsString = element => {
    let fieldValue = document.getElementById(element).value;
    let lettersRegex = /^[a-zA-Z\s]*$/;
    if(!lettersRegex.test(String(fieldValue).toLowerCase())) {
        showTextError(element, 'Nazwa moze zawierać tylko litery');
        showFieldError(element);
        return false;
    } else {
        hideFieldError(element);
        hideTextError(element);
        return true;
    }

}

const validateMinLength = (element, number) => {
    let fieldValueLen = document.getElementById(element).value.length ;

    if(fieldValueLen < number) {
        showTextError(element, `minimum ${number} znaków`);
        showFieldError(element);
        return false;
    } else {
        hideFieldError(element);
        hideTextError(element);
        return true;
    }
}

const validateRequiredField = element => {
    let fieldValue = document.getElementById(element).value;

    if(!fieldValue) {
        showTextError(element, 'wybrane pole jest wymagane');
        showFieldError(element);
        return false;
    } else {
        hideTextError(element);
        hideFieldError(element);
        return true;
    }

}

const isCheckboxChecked = element => {
    let checkboxVal = document.getElementById(ingredientIsAlcoValidation).checked;
    if(checkboxVal) {
        return true;
    } else {
        return false;
    }
}

const showFieldError = field => {
    document.getElementById(field).classList.add("field-error");
}

const hideFieldError = field => {
    document.getElementById(field).classList.remove("field-error");
}

const showTextError = (field, text) => {
    document.getElementById('error-'+field).innerHTML = text;
}

const hideTextError = (field) => {
    document.getElementById('error-'+field).innerHTML = '';
}