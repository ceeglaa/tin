window.onload = function(e){
    console.log('onload')
    }
    
    function validate() {
        let err = 0;
        if (!namevalidation('drinkname')) {
            err++
        }
        if (!valuevalidation('drinvalue')) {
            err++
        }

        if (err === 0 ){
        document.getElementById("error").setAttribute("style", "display: none;")
        } else {
            document.getElementById("error").setAttribute("style", "display: inline;")
        }
    }
    
    
    function namevalidation(element) {
        let name = document.getElementById(element)
        let error = false;
        if(!name.value){
            error = true;
            name.placeholder = 'nazwa jest wymagana'
        } else if(name.value.length < 5){
            error = true;
            name.value = ""
            name.placeholder = 'nazwa min. 5 znaków'
        } else {
            hideError(name)
            return true;
        }
    
        if (error === true) {
            showError(name);
            return false;
        }
    
    }

    function valuevalidation(element) {
        let name = document.getElementById(element)
        let error = false;
        if(name.value.length === 0 ){
            error = true;
            name.value = ""
            name.placeholder = 'moc jest wymagana'
        }
         else if(!parseInt(name.value)){
            error = true;
            name.value = ""
            name.placeholder = 'moc wyrazamy liczbą'
        } else if(parseInt(name.value) > 99){
            console.log('mniej niz 5')
            error = true;
            name.value = ""
            name.placeholder = 'maks 99'
        } else {
            hideError(name)
            return true;
        }
    
        if (error === true) {
            showError(name);
            return false;
        }
    
    }

    
    function showError(field){
        field.setAttribute("style", "background-color: #FE5555; border: 3px solid red;" );
    }
    function hideError(field){
        field.setAttribute("style", "background-color: #F9EEEF; border: none; border-bottom: 1px solid #aaa;" );
    }