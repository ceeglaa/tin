const drinksList = document.getElementById('only-drinks');
 let prevButton = document.getElementById('prev-button');
 let nextButton = document.getElementById('next-button');
 let editBtn;
 let delBtn;

let pivot;

window.onload = () => {
    getAndRenderDrinks(getDrinkListCall);
    pivot = 1;

}

prevButton.onclick = () => {
    getAndRenderDrinks(getDrinkListCall);
    pivot = pivot - 3;
}

nextButton.onclick = () => {
    console.log ('POREV BUTTON CLICKED')
    getAndRenderDrinks(getDrinkListCall);
    pivot = pivot + 3;
}

const getAndRenderDrinks = apiCall => {
        apiCall(renderDrinkList)
}

const editClickedDrink = drinkId => {
    window.location.href = `../data/Dodaj_Drinka_two.html?id=${drinkId}`;
}

const deleteClickedDrink = drinkId => {
    deleteDrinkFunction(deleteDrinkCall, drinkId, refreshPage)
}

const deleteDrinkFunction = (apiCall, drinkId, callback) => {
    apiCall(drinkId, callback);
}  

const refreshPage = () => {
    location.reload();
}

const renderDrinkList = drinksArray => {
    let visibleDrinksArray = []
    let k = pivot - 1;
    
    if (pivot+2 <= drinksArray.length) {
        for(let i = 0; i < 3; i++) {
            visibleDrinksArray.push(drinksArray[k]);
            k++;
        }
    } else {
        visibleDrinksArray = drinksArray.slice(pivot-1, drinksArray.length);
    }

    let drinksHtml = '';
    console.log(drinksArray);
    visibleDrinksArray.forEach(d => {
        console.log(d.photoPath);
        drinksHtml += `
        <div id="single-drink" class="single-drink">
            <div id="drink-photo" class="drink-photo">
                <img src=${d.photoPath}>
            </div>
            <div id="drink-name" class="drink-name">
                ${d.name}
            </div>
            <div id="drink-author" class="drink-author">
                Autor: Adrian Cegłowski
            </div>
            <div id="drink-vol" class="drink-vol">
                Moc: ${d.vol}%
            </div>
                <input id="edit-ingredient-button" type="submit" value="Edytuj drinka" onclick="editClickedDrink(${d.id})"/>
                <input id="delete-ingredient-button" type="submit" value="Usuń drinka" onclick="deleteClickedDrink(${d.id})"/>
        </div>
        `
    });

    if(pivot + 3 > drinksArray.length) {
        nextButton.style.visibility = 'hidden';
    } else {
        nextButton.style.visibility = 'visible';
    }

    if (pivot <= 1) {
        prevButton.style.visibility = 'hidden';
    } else {
        prevButton.style.visibility = 'visible';
    }

    drinksList.innerHTML = drinksHtml;

}