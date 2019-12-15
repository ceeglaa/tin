const ingredients = document.getElementById('ingredients-list-check');
const ingredienDetails = document.getElementById('ingredient-details');
const editButton = document.getElementById('edit-ingredient-button');
const deleteButton = document.getElementById('delete-ingredient-button');
const selectedIng = document.getElementById('ingredients-list-check');


window.onload = _ => {
    getAndRenderIngredients(getIngredientListCall);
    showOrHideButton();
}

const getAndRenderIngredients = apiCall => {
    apiCall(renderIngredientList)
}



const renderIngredientList = ingredientList => {
    console.log('initialize ' + ingredientList)
    ingredientArray = ingredientList;
    
    let ingredientsHtml = '';

    ingredientList.forEach(i => {
        ingredientsHtml += `
            <option value="${i.id}">${i.name}</optionm>
        `
    });

    ingredients.innerHTML = ingredientsHtml;
}

const onSelectIngredient = () => {
    var selectedIngredient = ingredients.options[ingredients.selectedIndex].value;
    getAndRenderSelectedIngredient(getIngredientDetailsCall, selectedIngredient, renderIngredientDetails);
    showOrHideButton();
}

const getAndRenderSelectedIngredient = (apiCall, ingredientId, callback) => {
    apiCall(ingredientId, callback);
    return false;
}

const renderIngredientDetails = ingredient => {
    let ingredientDetailsHtml = ''

    console.log(ingredient)

    ingredientDetailsHtml += `
    <h2>Dane Składnika</h2>
    <div class="property">Nazwa</div> <div class="property-value">${ingredient.name}</div>
    <div class="property">Średnia cena</div> <div class="property-value">${ingredient.price}</div>
    <div class="property">Czy alkohol</div><div class="property-value"> <input type="checkbox" disabled="disabled" ${ingredient.isAlc ? "checked" : ""}> </div>
    <div class="property">Moc</div> <div class="property-value">${ingredient.vol ? ingredient.vol : "0"} %</div>
    <div class="property">Smak</div> <div class="property-value">${ingredient.taste}</div>
    <div class="property">Czy gazowany</div> <div class="property-value"> <input type="checkbox" disabled="disabled" ${ingredient.isGas ? "checked" : ""}> </div>
    `

    ingredienDetails.innerHTML = ingredientDetailsHtml;
}

editButton.onclick = () =>{
    window.location.href = `../data/Dodaj_Skladnik.html?id=${selectedIng.value}`;
}

deleteButton.onclick = () => {
    console.log('usunieto ')
    deleteIngredient(deleteIngredientCall, selectedIng.value, refreshPage) 
}

deleteIngredient = (apiCall, ingredientId, callback) => {
    apiCall(ingredientId,callback)
}

refreshPage = () => {
    location.reload();
}

showOrHideButton = () => {
    if (selectedIng.value === '') {
        editButton.style.visibility = 'hidden';
        deleteButton.style.visibility = 'hidden';
    } else {
        editButton.style.visibility = 'visible';
        deleteButton.style.visibility = 'visible';
    }
    
}