"use strict";
const log = console.log;
const screenText = document.querySelector(".screen-text");
const buttons = document.querySelectorAll(".button");

let screenTextValues = "";
let slicedString = "";
let tempString = "";
let charArray = ["÷", "×", "−", "+"];
let charArray2 = ["÷", "×", "+"];

function toggleBlinkingEffect() {
    if (screenText.innerText == "|") {
        screenText.classList.add("insertion-point");
    } else {
        screenText.classList.remove("insertion-point");
    }
}

screenText.addEventListener('keyup', (e) => {
    let keyboardInput = e.target.innerText;
    // console.log(keyboardInput);
    defaultBehaviour(keyboardInput);
})

screenText.addEventListener('keydown', (e) => {
    if (e.target.innerText === '|') {
        e.target.innerText = '';
    }
})

//Adds an eventListener to each button
buttons.forEach(button => {
    addListener(button);
});

function addListener(button) {
    button.addEventListener("click", () => getInnerText(button));
}

function getInnerText(button) {
    let buttonValue = button.firstElementChild.innerText;
    updateScreen(buttonValue);
}

function errorMessage() {
    screenTextValues = "Error";
    screenText.innerText = screenTextValues;
}

function defaultBehaviour(buttonValue) {
    //Ensures that the vertical bar does not stay in front of the text
    if (screenTextValues == "|") {
        screenTextValues = "";
    }

    if (screenTextValues == "Error" || screenTextValues == "Infinity") {
        screenTextValues = "";
    }

    //Start 
    //This section of code prevents certain operators from being typed in succession
    tempString += buttonValue;

    let lastCharIndex = tempString.length - 1;
    let tempStringLastChar = tempString[lastCharIndex];
    let tempStringLastCharIndex = tempString.lastIndexOf(tempStringLastChar);

    let secondToLastCharIndex = tempString.length - 2;
    let secondToLastChar = tempString[secondToLastCharIndex];

    let screenTextValuesLastIndex = screenTextValues.length - 1;
    let screenTextValuesLastChar = screenTextValues[screenTextValuesLastIndex];

    if (charArray.includes(tempStringLastChar) && tempStringLastCharIndex == lastCharIndex &&
        charArray.includes(secondToLastChar)) {

        buttonValue = "";
    }

    if (charArray2.includes(screenTextValuesLastChar) && tempStringLastChar == "−") {
        buttonValue = tempStringLastChar;
    }
    //End

    screenTextValues += buttonValue;
    screenText.innerText = screenTextValues;
    toggleBlinkingEffect();
}

function updateScreen(buttonValue) {

    switch (buttonValue) {

        case "AC":
            screenTextValues = "";
            tempString = "";
            screenText.innerText = "|";
            toggleBlinkingEffect();
            break;

        case "C":
            let secondToLastCharacter = screenTextValues[screenTextValues.length - 2];

            if (screenTextValues == "Error" || screenTextValues == "Infinity") {
                tempString = "";
                screenTextValues = "|";
                screenText.innerText = screenTextValues;
                toggleBlinkingEffect();
                break;
            }

            if (charArray.includes(secondToLastCharacter)) {
                tempString += secondToLastCharacter;
            }
            else {
                tempString = "";
            }

            slicedString = screenTextValues.slice(0, -1);

            if (slicedString == "") {
                slicedString = "|";
            }

            screenTextValues = slicedString;
            screenText.innerText = screenTextValues;
            toggleBlinkingEffect();
            break;

        case "=":
            try {
                let regex = /(\*%|\/%|\+%|-%)/g;
                let newExpression = screenTextValues.replace(/×/g, "*");
                newExpression = newExpression.replace(/÷/g, "/");
                newExpression = newExpression.replace(/−/g, "-");

                if (regex.test(newExpression)) {
                    errorMessage();
                    break;
                }

                let newExpressionLastChar = newExpression[newExpression.length - 1];

                if (newExpressionLastChar == "%") {
                    newExpression = newExpression.replace(/%/g, "*0.01*");
                    newExpression = newExpression.replace(/\*\*/g, "*");
                    newExpression = newExpression.slice(0, newExpression.length - 1);
                }

                screenTextValues = `${eval(newExpression)}`;
                screenText.innerText = screenTextValues;
            }
            catch {
                errorMessage();
            }
            break;

        default:
            defaultBehaviour(buttonValue);
    }
}