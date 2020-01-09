const addIngredientButton = document.getElementById('addIngredient-button');
const ingredientsTable = document.getElementById('tbody-ingredients');
const ingredients = document.getElementById('ingredients-list');
const ingredientQuantity = document.getElementById('ingredient-qty');
const createDrinkButton = document.getElementById('add-drink-button');
const drinkName = document.getElementById('drinkname');
const drinkVol = document.getElementById('drinvalue');
const drinkTaste = document.getElementById('drinkt-taste');
const drinkDesc = document.getElementById('drinkdesc');
const photoButton = document.getElementById('add-photo-button');
const photo = document.getElementById('drink-photo-file');
const filterIngredients = document.getElementById('filter-ingredients');

const formData = new FormData();

let ingredientArray = [];
let selectedIngredientArray = [];

window.onload = _ =>{
    let urlParams = new URLSearchParams(window.location.search);
    let drinkId = urlParams.get('id');
    if(drinkId !== null) {
        getDrinkDetails(drinkId, renderDrinkData);
        createDrinkButton.value='Zapisz zmiany'
    }
    
    getAndRenderIngredients(getIngredientListCall);
}

addIngredientButton.onclick = () => {
    validateAddIngredient(addIngredient);
}

createDrinkButton.onclick = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let drinkId = urlParams.get('id');
    console.log('create drink');
    if(drinkId !== null) { 
        validateAddEditDrink(editDrink, editDrinkCall, drinkId)
    } else {
        validateAddEditDrink(saveForm, addDrinkCall, null);
    }
    
}


filterIngredients.oninput = () => {
    filterIngredientsValue = filterIngredients.value
    filteredIngredientArray = ingredientArray.filter(ing => {return ing.name.toLowerCase().includes(filterIngredientsValue.toLowerCase())});
    renderIngredientList(filteredIngredientArray);
}

const savePhoto = apiCall => {
      
    formData.append("file", photo.files[0]);
    formData.append("photoname", drinkName.value);
    apiCall(formData);
    return false;
}

const editDrink = (apiCall, drinkId) => {

    const drinkData = {
        name: drinkName.value,
        vol: drinkVol.value,
        taste: drinkTaste.value,
        ingredients: selectedIngredientArray,
        price: 140,
        desc: drinkDesc.value,
        id: drinkId
    }
    apiCall(drinkData, drinkId);

    return false;

}

const saveForm = apiCall => {

    let photoPath =  `../img/${drinkName.value}.jpg`
    console.log(photoPath);

    const drink = {
        name: drinkName.value,
        vol: drinkVol.value,
        taste: drinkTaste.value,
        price: 140,
        desc: drinkDesc.value,
        photoPath: photoPath
    }

    const drinkData = {
        drink: drink,
        amounts: selectedIngredientArray
    }


    savePhoto(savePhotoCall);
    apiCall(drinkData);

    return false;
}

const calculateDrinkVol = () => {
    let allIngredientsGrammage = 0;
    let alcoholGrammage = 0;
    selectedIngredientArray.forEach(ing => {
    allIngredientsGrammage += parseFloat(ing.amount);
        if(ing.ingredient.isAlc) {
            alcoholGrammage += (parseFloat(ing.ingredient.vol)/100) * (parseFloat(ing.amount));
        }
    })

    let drinkvol = round(alcoholGrammage/allIngredientsGrammage*100, 1);
    drinkVol.value=drinkvol;
}

const getAndRenderIngredients = apiCall => {
    apiCall(initializeIngredientArray)
}

const initializeIngredientArray = ingredientList => {
    ingredientArray=ingredientList;
    renderIngredientList(ingredientArray);
}

const renderIngredientList = renderedArray => {
    console.log(renderedArray);
    let ingredientsHtml = '';

    renderedArray.forEach(i => {
        ingredientsHtml += `
            <option value="${i.id}">${i.name}</optionm>
        `
    });

    ingredients.innerHTML = ingredientsHtml;
}


const round = (n, k) => {
    var factor = Math.pow(10, k);
    return Math.round(n * factor) / factor;
  }



function addIngredient() {

    selIng = ingredients.options[ingredients.selectedIndex]
    console.log(selIng);
    selectedIngredientId = selIng.value;
    ingQty = ingredientQuantity.value;

    let selectedIngredient = ingredientArray.find(el => {
        return el.id === parseFloat(selectedIngredientId);
    });
    
    let addedIngAmount = {
        ingredient: selectedIngredient,
        amount: ingQty
    }

    selectedIngredientArray.push(addedIngAmount);
    selIng.selected = false;
    ingredientQuantity.value = "";
    renderSelectedIngredientsTable(selectedIngredientArray);
}

function renderSelectedIngredientsTable(selectIngRenderArray){
    console.log(selectIngRenderArray);
    let ingredientsHtml = ''
    let i = 0;
    selectedIngredientArray = selectIngRenderArray;
    selectIngRenderArray.forEach(ing => {
        ingredientsHtml += `
        <tr>
            <td>${ing.ingredient.name}</td>            
            <td>${ing.amount}</td>            
            <td class="actions">
                <a href="#" onClick="deleteIngredientFromDrink(${i})">Usuń</a>
            </td>            
        </tr>
    `;
    i++;
    });
    ingredientsTable.innerHTML = ingredientsHtml;
    calculateDrinkVol();
}


const renderDrinkData = drink => {
    console.log(drink);
    drinkName.value = drink.name;
    drinkVol.value = drink.vol;
    drinkTaste.value = drink.taste;
    drinkDesc.value = drink.desc;
    let selectedIngredient = []
    //selectedIngredient = Array.from(drink.ingredients);

    renderSelectedIngredientsTable(drink.amounts);
}


function deleteIngredientFromDrink(index) {
    console.log('deleting index ' + index);
    selectedIngredientArray.splice(index, 1);
    renderSelectedIngredientsTable(selectedIngredientArray);
}