window.onload = function(e){
    console.log('onload')
    }
    
    function validatereg() {

        let errors = true;
        console.log(errors)
        if (!emailvalidation('email')) {
            errors = false;
        }
        if (!requiredvalidation('lastname')) {
            errors = false;
        }
        if (!requiredvalidation('firstname')) {
            errors = false;
        }
        if (!requiredvalidation('username')) {
            errors = false;
        }

        if(!birthdatevalidation('birthdate')) {
            errors = false;
        }

        if (!checkpassword('password')) {
            errors = false;
        }

        if (!errors ){
            document.getElementById("error").setAttribute("style", "display: inline;")
        } else {
            document.getElementById("error").setAttribute("style", "display: none;")
        }
    }

    function emailvalidation(element){
        let email = document.getElementById(element)
        let error = false;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email.value){
            document.getElementById('errors_'+element).innerHTML = "Pole jest wymagane"
            error = true;
        } else if(!re.test(String(email.value).toLowerCase())) {
            document.getElementById('errors_'+element).innerHTML = "błędny email"
            error = true;
        } 
        
        if(error === true) {
            showError(email);
            return false;
        } else {
            document.getElementById('errors_'+element).innerHTML = ""
            hideError(email)
            return true
        }
    }
    
    
    function requiredvalidation(element) {
        let name = document.getElementById(element)
        
        let error = false;
        if(!name.value){
            document.getElementById('errors_'+element).innerHTML = "Pole jest wymagane"
            error = true;
        } 
    
        if(error === true) {
            showError(name);
            return false;
        } else {
            document.getElementById('errors_'+element).innerHTML = ""
            hideError(name)
            return true;
        }
    
    }

    function birthdatevalidation(element){
        let name = document.getElementById(element)
        let error = false;
        let date = new Date(name.value)
        let today = new Date();
        if (isNaN(date.getTime())) {
            document.getElementById('errors_'+element).innerHTML = "Pole jest wymagane"
            error = true;
        } else if (date > today) {
            document.getElementById('errors_'+element).innerHTML = "Błędna data"
            error = true;
        } else if (!is18years(date.getDay(), date.getMonth(), date.getFullYear())) {
            document.getElementById('errors_'+element).innerHTML = "Użytkownik musi być pełnoletni"
            error = true;
        }

        if(error === true) {
            showError(name);
            return false;
        } else {
            document.getElementById('errors_'+element).innerHTML = ""
            hideError(name)
            return true;
        }
    }

    function checkpassword(element) {
        let pass = document.getElementById(element)
        let repass = document.getElementById(element + '2')
        let error = false;
        if(!pass.value){
            document.getElementById('errors_'+element).innerHTML = "Pole jest wymagane"
            error = true;
            showError(pass);
        } else if (!(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(pass.value))) {
            document.getElementById('errors_'+element).innerHTML = "8 znakow, mala i duza litera, cyfa, znak specjalny"
            error = true;
            showError(pass);
        } else if (pass.value !== repass.value) {
            document.getElementById('errors_'+element).innerHTML = ""
            hideError(pass)
            document.getElementById('errors_'+element+'2').innerHTML = "hasła nie są takie same"
            error = true;
            showError(repass);
        } else {
            hideError(repass)
            document.getElementById('errors_'+element+'2').innerHTML = ""
        }

        if (error === true) {
            return false;
        } else {
            return true;
        }
    
    }

    function is18years(day, month, year) {
        return new Date(year+18, month-1, day) <= new Date();
    }

    
    function showError(field){
        field.classList.add("field-error");
       // field.setAttribute("style", "background-color: #FE5555; border: 3px solid red;" );
    }
    function hideError(field){
        field.classList.remove("field-error");
        //field.setAttribute("style", "background-color: #F9EEEF; border: none; border-bottom: 1px solid #aaa;" );
    }