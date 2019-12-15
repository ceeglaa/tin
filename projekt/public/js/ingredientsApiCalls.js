const ingredientApiBaseUrl = 'http://localhost:3001/api/ingredient';

function getIngredientListCall(callback) {
    const req = new XMLHttpRequest();
    req.open('GET', ingredientApiBaseUrl, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                const userData = JSON.parse(respText);
                callback(userData);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function addIngredientCall(ingredientData){
    console.log('inside addIngredientCall')
    console.log(ingredientData);
    const req = new XMLHttpRequest;
    req.open('POST', ingredientApiBaseUrl, true);
    const ingredientDataString = JSON.stringify(ingredientData);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(ingredientDataString);
    req.send(ingredientDataString);
}

function editIngredientCall(ingredientData){
    const req = new XMLHttpRequest;
    req.open('PUT', ingredientApiBaseUrl + `/update`, true);
    const ingredientDataString = JSON.stringify(ingredientData);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(ingredientDataString);
    console.log(req);
    req.send(ingredientDataString);
}

function deleteIngredientCall(ingredientId, callback) {
    const req = new XMLHttpRequest;
    req.open('DELETE', ingredientApiBaseUrl + `/${ingredientId}`, true)
    req.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                callback();
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(ingredientId);
}

function getIngredientDetailsCall(ingredientId, callback) {
    const req = new XMLHttpRequest;
    req.open('GET', ingredientApiBaseUrl + `/${ingredientId}`, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                const ingredient = JSON.parse(respText);
                callback(ingredient[0]);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function dump(text) {
    console.log(text);
}