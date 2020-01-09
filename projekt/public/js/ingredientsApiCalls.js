const ingredientApiBaseUrl = 'http://localhost:3001/api/ingredient';
const springApi = 'http://localhost:8080/api/ingredients';

function getIngredientListCall(callback) {
    const req = new XMLHttpRequest();
    req.open('GET', springApi, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                console.log('RESPONSE SRPING');
                console.log(respText);
                const userData = JSON.parse(respText);
                console.log('DO CALLBACKA SRPING');
                console.log(userData);
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
    req.open('POST', springApi, true);
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
    req.open('GET', springApi + `/${ingredientId}`, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                console.log('RESPONSE SRPING');
                console.log(respText);
                const userData = JSON.parse(respText);
                console.log('DO CALLBACKA SRPING');
                console.log(userData);
                callback(userData);
                const ingredient = JSON.parse(respText);
                console.log('DO CALLBACKA SRPING 222'); 
                console.log(ingredient);

                console.log('DO CALLBACKA OD ZERA 222'); 
                console.log(ingredient[0]);
                callback(ingredient);
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