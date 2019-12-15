const editDrinkButton = document.getElementById('add-drink-button');
window.onload = _ =>{
    const urlParams = new URLSearchParams(window.location.search);
    const drinkId = urlParams.get('id'); // returns the value of parameter 'lan'
}



const sdfdas = drink => {
    console.log(drink);
    drinkName.value = drink.name;
    drinkVol.value = drink.vol;
    drinkTaste.value = drink.taste;
    drinkDesc.value = drink.desc;
    let selectedIngredient = []
    selectedIngredient = Array.from(drink.ingredients);

    console.log(selectedIngredient);
    renderSelectedIngredientsTable(selectedIngredient);
}