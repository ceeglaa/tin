const saveButton = document.getElementById('form-submit');
const formName = document.getElementById('name');
const formPrice = document.getElementById('price');
const formTaste = document.getElementById('taste');
const formVol = document.getElementById('vol');
const formIsAlco = document.getElementById('isAlco');
const formisGas = document.getElementById('isGas');

window.onload = () => {

    let urlParams = new URLSearchParams(window.location.search);
    let ingredientId = urlParams.get('id');
    if(ingredientId !== null) {
        getAndRenderIngredientData(getIngredientDetailsCall, ingredientId, renderIngredientData);
        saveButton.value='Zapisz zmiany'
    }
}

saveButton.onclick = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let ingredientId = urlParams.get('id');
    if(ingredientId !== null) {
        editIngredient(editIngredientCall, ingredientId)
    } else {
        validateCreateIngredient(saveForm, addIngredientCall);
    }
}

formIsAlco.onclick = () => {
    if(formIsAlco.checked) {
        console.log('checked')
        formVol.disabled = false;
    } else {
        console.log('unchecked')
        formVol.disabled = true;
        formVol.value = '';
        hideFieldError(ingredientVolumeValidation);
        hideTextError(ingredientVolumeValidation);
    }
}

const getAndRenderIngredientData = (apiCall, ingredientId, callback) => {
    apiCall(ingredientId, callback);
    return false;
}

const editIngredient = (apiCall, ingredientId) => {

    const ingredientData = {
        name: formName.value,
        isAlc: formIsAlco.checked,
        isGas: formisGas.checked,
        price: formPrice.value,
        taste: formTaste.value,
        vol: formVol.value,
        id: ingredientId
    }

    apiCall(ingredientData, ingredientId);

    return false;

}

function saveForm(apiCall) {
    const ingredientData = {
        name: formName.value,
        isAlc: formIsAlco.checked,
        isGas: formisGas.checked,
        price: formPrice.value,
        taste: formTaste.value,
        vol: formVol.value
    }

    console.log('inside saveForm');

    apiCall(ingredientData);

    return false;
}

renderIngredientData = ingredient => {
   
    formName.value = ingredient.name;
    formPrice.value = ingredient.price;
    formTaste.value = ingredient.taste;
    formVol.value = ingredient.vol ? formVol : 0
    formIsAlco.checked = ingredient.isAlc;
    formisGas.checked = ingredient.isGas;
}

function getCheckBoxValue(element) {
    console.log('Inside get checkboc value function');
    console.log(element);
    if(element) {
        return true
    } else {
        return false
    }
}