"use strict";

const screenText = document.querySelector(".screen-text");
const buttons = document.querySelectorAll(".button");

let screenTextValues = "";
let slicedString = "";
let tempString = "";
let charArray = ["÷", "×", "−", "+"];
let charArray2 = ["÷", "×", "+"];

//Adds an eventListener to each button
buttons.forEach(button => {
    addListener(button);
});

function addListener(button){
    button.addEventListener("click", () => getInnerText(button));
}

function getInnerText(button){
    let buttonValue = button.firstElementChild.innerText;
    updateScreen(buttonValue);
}

function updateScreen(buttonValue){

    switch (buttonValue){

        case "AC":
            screenTextValues = "";
            tempString = "";
            screenText.innerText = "|";
            toggleBlinkingEffect();
            break;

        case "C":
            let secondToLastCharacter = screenTextValues[screenTextValues.length - 2];

            if(charArray.includes(secondToLastCharacter)){
                tempString += secondToLastCharacter;
            }
            else{
                tempString = "";
            }

            slicedString = screenTextValues.slice(0, -1);

            if (slicedString == ""){
                slicedString = "|";
            }

            screenTextValues = slicedString;
            screenText.innerText = screenTextValues;
            toggleBlinkingEffect();
            break;
        
        case "=":
            let newExpression = screenTextValues.replace(/×/g, "*");
            newExpression = newExpression.replace(/÷/g, "/");
            newExpression = newExpression.replace(/−/g, "-");

            let newExpressionLastChar = newExpression[newExpression.length - 1];
            
            if(newExpressionLastChar == "%"){
                newExpression = newExpression.replace(/%/g, "*0.01*");
                newExpression = newExpression.replace(/\*\*/g, "*");
                newExpression = newExpression.slice(0, newExpression.length - 1);
            }

            screenTextValues = `${eval(newExpression)}`;
            screenText.innerText = screenTextValues;
            break;

        default:
            //Ensures that the vertical bar does not stay in front of the text
            if (screenTextValues == "|"){
                screenTextValues = "";
            }

            tempString += buttonValue;
        
            let lastCharIndex = tempString.length - 1;
            let tempStringLastChar = tempString[lastCharIndex];
            let tempStringLastCharIndex = tempString.lastIndexOf(tempStringLastChar);

            let secondToLastCharIndex = tempString.length - 2;
            let secondToLastChar = tempString[secondToLastCharIndex];

            let screenTextValuesLastIndex = screenTextValues.length - 1;
            let screenTextValuesLastChar = screenTextValues[screenTextValuesLastIndex];

            if (charArray.includes(tempStringLastChar) && tempStringLastCharIndex == lastCharIndex && 
                charArray.includes(secondToLastChar)){
                
                buttonValue = "";
            }
            
            if (charArray2.includes(screenTextValuesLastChar) && tempStringLastChar == "−"){
                buttonValue = tempStringLastChar;
            }

            screenTextValues += buttonValue;
            screenText.innerText = screenTextValues;
            toggleBlinkingEffect();
    }
}

function toggleBlinkingEffect(){
    if (screenText.innerText == "|"){
        screenText.classList.add("insertion-point");
    }else{
        screenText.classList.remove("insertion-point");
    }
}