const ingredients = document.getElementById('ingredients-list');

let ingredientArray = [];

window.onload = _ =>{
    getAndRenderIngredients();
}

const getAndRenderIngredients = _ => {
    getIngredientListCall(renderIngredientList)
}

const renderIngredientList = ingredientList => {
    ingredientArray = ingredientList;
    console.log()
    let ingredientsHtml = '';

    ingredientList.forEach(i => {
        console.log(Object.values(i))
        ingredientsHtml += `
            <option value="${i.id}">${i.name}</optionm>
        `
    });

    ingredients.innerHTML = ingredientsHtml;
}