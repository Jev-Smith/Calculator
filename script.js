"use strict";

const screenText = document.querySelector(".screen-text");
const buttons = document.querySelectorAll(".button");

let screenTextValues = "";
let slicedString = "";

function updateScreen(buttonValue){

    switch(buttonValue){
        case "AC":
            screenTextValues ="";
            screenText.innerText = "|";
            break;

        case "C":
            slicedString = screenTextValues.slice(0, -1);

            if(slicedString == ""){
                slicedString = "|";
            }

            screenTextValues = slicedString;
            screenText.innerText = screenTextValues;
            break;
        
        default:
            //Ensures that the vertical bar does not stay in front of the text
            if(screenTextValues == "|"){
                screenTextValues = "";
            }
            
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

//Adds an eventListener to each button
buttons.forEach(val => {
    addListener(val);
});


