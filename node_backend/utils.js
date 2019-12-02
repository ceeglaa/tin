const add = (fisrt_number, second_number) => {
    if(checkIsNumbers(fisrt_number, second_number)) {
        let result = (parseFloat(fisrt_number) + parseFloat(second_number));
        return "additione result " + result;
    } else {
        return "Given parameters are not numbers"
    }
}

const sub = (fisrt_number, second_number) => {
    if(checkIsNumbers(fisrt_number, second_number)) {
        let result = (parseFloat(fisrt_number) - parseFloat(second_number));
        return " substraction result " + result;
    } else {
        return "Given parameters are not numbers"
    }
}

const mul = (fisrt_number, second_number) => {
    if(checkIsNumbers(fisrt_number, second_number)) {
        let result = (parseFloat(fisrt_number) * parseFloat(second_number));
        return "multiplication result " + result;
    } else {
        return "Given parameters are not numbers"
    }
}

const div = (fisrt_number, second_number) => {
    if(checkIsNumbers(fisrt_number, second_number)) {
        if (parseFloat(second_number) === 0) {
            return 'CAN NOT DIVIDE BY ZERO!!!'
        } else {
            let result = (parseFloat(fisrt_number) / parseFloat(second_number));
            return "division result " + result;
        }
    } else {
        return "Given parameters are not numbers"
    }
}



const checkIsNumbers = (fisrt_number, second_number) => {
    if(parseFloat(fisrt_number) && parseFloat(second_number)) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    add,
    div,
    mul,
    sub
};