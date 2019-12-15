const drinkApiBaseUrl = 'http://localhost:3001/api/drink';
const saveDrinkPhoto = 'http://localhost:3001/api/upload';

function addDrinkCall(drinkData){
    const req = new XMLHttpRequest;
    req.open('POST', drinkApiBaseUrl, true);
    const drinkDataString = JSON.stringify(drinkData);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(drinkDataString);
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
    req.open('DELETE', drinkApiBaseUrl + `/${drinkId}`, true)
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
    req.open('GET', drinkApiBaseUrl + `/${drinkId}`, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                const drink = JSON.parse(respText);
                callback(drink[0]);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function getDrinkListCall(callback) {
    const req = new XMLHttpRequest;
    req.open('GET', drinkApiBaseUrl, true);
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

function savePhotoCall(photo){

    console.log('inside drinkDataCall')
    const req = new XMLHttpRequest;
    req.open('POST', saveDrinkPhoto, true);
    req.send(photo);

}