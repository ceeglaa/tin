const drinkApiBaseUrl = 'http://localhost:3001/api/drink';
const saveDrinkPhoto = 'http://localhost:3001/api/upload';
const springUrl = 'http://localhost:8080/api/drinks'

function addDrinkCall(drinkData){
    const req = new XMLHttpRequest;
    req.open('POST', springUrl, true);
    const drinkDataString = JSON.stringify(drinkData);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(drinkDataString);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                console.log(req.response);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(drinkDataString);
}

function editDrinkCall(drinkData){
    const req = new XMLHttpRequest;
    req.open('PUT', drinkApiBaseUrl + `/update`, true);
    const drinkDataString = JSON.stringify(drinkData);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(drinkDataString);
    console.log(req);
    req.send(drinkDataString);
}

function deleteDrinkCall(drinkId, callback) {
    const req = new XMLHttpRequest;
    req.open('DELETE', springUrl + `/${drinkId}`, true)
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
    req.send(null);
}

function getDrinkDetails(drinkId, callback) {
    const req = new XMLHttpRequest;
    req.open('GET', springUrl + `/drinks/${drinkId}`, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                const drink = JSON.parse(respText);
                callback(drink);
                console.log(drink);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function getDrinkIngredients(drinkId, callback) {
    const req = new XMLHttpRequest;
    req.open('GET', springUrl + `/drinks/${drinkId}/ingredients`, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                const userData = JSON.parse(respText);
                console.log(userData);
                callback(userData);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function getDrinkListCall(callback) {
    const req = new XMLHttpRequest;
    req.open('GET', springUrl , true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                const userData = JSON.parse(respText);
                console.log(userData);
                callback(userData);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function savePhotoCall(photo){

    console.log('inside drinkDataCall')
    const req = new XMLHttpRequest;
    req.open('POST', saveDrinkPhoto, true);
    req.send(photo);

}