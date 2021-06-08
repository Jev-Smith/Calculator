"use strict";

const screenText = document.querySelector(".screen-text");
const buttons = document.querySelectorAll(".button");

let screenTextValues = "";

function toggleBlinkingEffect(){
    
}

function updateScreen(buttonValue){
    if(buttonValue == "AC" || buttonValue == "C"){
        screenTextValues = "";
        screenText.innerText = "|";
    }
    else{
        screenTextValues += buttonValue;
        screenText.innerText = screenTextValues;
    }
}

function addListener(button){
    button.addEventListener("click", function(){
        let buttonValue = button.firstElementChild.innerText;
        updateScreen(buttonValue);
    })
}

buttons.forEach(val => {
    addListener(val);
});


