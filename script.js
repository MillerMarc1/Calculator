let defaultDisplayVal = '0';
let displayVal = '0';
let operand;
let resetScreen = false;
let num1;
let num2;
const displayElement = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
displayElement.innerText = defaultDisplayVal;

window.addEventListener('keydown', function(e) {
    if (resetScreen) {
        clear();
        resetScreen = false;
    }
    let key;
    if (e.shiftKey) {
        if (e.key == "+") {
            key = this.document.querySelector('.add');
        }
    } else {
        key = this.document.querySelector(`button[data-key=${e.code}]`); 
    }
    if (key != undefined) {
        const keyInfo = key.innerText;
        handleInput(keyInfo);
    }
});

buttons.forEach((btn) => btn.addEventListener('click',  function(e) {
    console.log(e.target.innerText)
    if (resetScreen) {
        clear();
        resetScreen = false;
    }
    handleInput(e.target.innerText);
}));


function handleInput(key) {
    if (key == "AC") {
        ac();
        return;
    }

    if (Number(key) || key == 0) {
        if (displayElement.textContent == '0') {
            clear();
            display(key);
        } else {
            display(key);
        }   
    } else {
        if (num1 === undefined) {
            operand = key;
            num1 = displayElement.innerText;
            resetScreen = true;
            console.log("num1: " + num1);
            console.log("num1 operand: " + operand);
        } else {
            if (operand == undefined) {
                operand = key;
            }
            if (displayElement.innerText != '') {
                num2 = displayElement.innerText;
                console.log("num2: " + num2);
                displayVal = operate(operand, num1, num2);

                if (typeof(displayVal) == 'number' || !displayVal.includes("ERR")) {
                    num1 = displayVal;
                    console.log("display val: " + displayVal);
                    clear();
                    display(displayVal);
                    resetScreen = true;
                    operand = key;
                } else {
                    ac();
                }
            } else {
                display(displayVal);
                operand = key;
                resetScreen = true;
            }
        }
        console.log("operand: " + operand);
    }  
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return sub(num1, num2);
        case 'x':
            return mult(num1, num2);
        case '÷':
            return div(num1, num2);
        case '=':
            break;
        default:
            break;
    }
}

function display(key) {
    const display = document.querySelector('.display');
    display.textContent += key;
}

function clear() {
    displayElement.innerText = '';
}

function ac() {
    num1 = undefined;
    num2 = undefined;
    operand = undefined;
    displayVal = 0;
    clear();
    displayElement.innerText = defaultDisplayVal;
}

// ADD
function add(num1, num2) {
    return Number(num1) + Number(num2);
}

// SUBTRACT
function sub(num1, num2) {
    return Number(num1) - Number(num2);  
}

// MULTIPLY
function mult(num1, num2) {
    return Number(num1) * Number(num2);
}

// DIVIDE
function div(num1, num2) {
    console.log("HERE");
    if (Number(num2) == 0) {
        console.log("HERE2");
        num1 = 0;
        num2 = 0;
        operand = undefined;
        resetScreen = true;
        displayElement.innerText = "ERR: DIVIDE BY 0";
        return "ERR: DIVIDE BY 0";
    }
    return Number(num1) / Number(num2);
}