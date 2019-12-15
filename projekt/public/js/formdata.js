

const photoButton = document.getElementById('submitformdata');

window.onload = _ =>{
    let myForm = document.getElementById('myForm');
let formData = new FormData(myForm);
console.log(formData);
}

photoButton.onclick = () => {
let myForm = document.getElementById('myForm');
let formData = new FormData(myForm);
console.log(formData.get('file'));
console.log(formData);

return false;

}

