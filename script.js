// CALCULATOR
const calculator = document.getElementById("calculator");
const display = document.getElementById("display");
//container keeps track of ongoing operations
const container = {
    first: '', 
    operation: '',
    second: '',
    answer: '',
};

//misc variables
let firstValFinished = false;
let calculated = false;

calculator.addEventListener("click", (event) => {

    //clear the calculator when C is pressed
    if (event.target.classList.contains("clear")) {
        clearDisplay();
        cleanContainer();
    }
     
    if (event.target.classList.contains("num")) {
        if (calculated) {
            clearDisplay();
            calculated = false;
        }
        const value = event.target.textContent;
        updateDisplay(value); 
        if (!firstValFinished) {
            container.first += value;
            console.log("The first value is " + container.first);
        } 
        else {
            container.second += value;
            console.log("The second value is " + container.second);
            
        } 
        }
    //operator support
    if (event.target.classList.contains("operation") && !event.target.classList.contains("equal")) {
       firstValFinished = true;
       if (container.first == '') {
        container.first = 0;
        updateDisplay(container.first);
       }
       const value = event.target.textContent;
       updateDisplay(" " + value + " "); 
       container.operation = value;
    }
});
//equals support
const equal = document.getElementById("equal");
equal.addEventListener("click", (event) => {
    if (event.target.classList.contains("equal")) {
        clearDisplay();
        updateDisplay(calculate());
    }
});
//ans support
const ans = document.getElementById("ans");
ans.addEventListener("click", (event) => { 
    if (firstValFinished) {
        container.second = container.answer;
    } 
    else {
        clearDisplay();
        container.first = container.answer;
    }
    firstValFinished = true;
    updateDisplay(container.answer);
})

//functions 
function clearDisplay() {
    display.textContent = 0;
}
function updateDisplay(value) {
    if (display.textContent == 0) {
        clearDisplay();
        display.textContent = value;
    }
    else {
    display.textContent += value;
    }
}
function calculate() {
    container.first = parseFloat(container.first);
    container.second = parseFloat(container.second);
    console.log(container.first);
    console.log(container.second);
    let value = 0;
    switch(container.operation) {
        case '+':
            value = container.first + container.second;
            break;
        case '-':
            value = container.first - container.second;
            break;
        case 'x':
            value = container.first * container.second;
            break;
        case '÷':
            value = container.first / container.second;
            break; 
    }
    cleanContainer();
    calculated = true;
    container.answer = value;
    return value.toFixed(3);
}

function cleanContainer() {
    container.first = '';
    container.second = '';
    container.operation = '';
    firstValFinished = false;
    container.answer = ''; 
}