/**
 * JS CALCULATOR by Goran Arsenić
 */


var calculator = {
    display: function(value) {
        var displayDiv = document.getElementById("text");
        displayDiv.innerHTML = "";
        var valueParagraph = document.createElement("p");
        valueParagraph.textContent = value;
        displayDiv.appendChild(valueParagraph);
    },
    setListener: function() {
        var firstOperand = "";
        var secondOperand = "";
        var operator = "";
        var buttonsDiv = document.getElementById("buttonsDiv");
        buttonsDiv.addEventListener("click", function(event) {
            var elementClicked = event.target;
            var clickedValue = elementClicked.textContent; // text on clicked button
            // first operand
            // if button in "numbersDiv" was clicked and operator is not set or "=" was left from the previous calculation
            if(elementClicked.parentElement.className === "numbersDiv" && (operator === "" || operator === "=")) {
                // reset first operand and operator, but only if clicked value is not "+/-"
                if(operator === "=" && clickedValue !== "+/-") {
                    firstOperand = "";
                    operator = "";
                }
                firstOperand = calculator.setOperand(clickedValue, firstOperand);
                calculator.display(firstOperand);
            // second operand
            // if button in "numbersDiv" was clicked and operator is set
            } else if (elementClicked.parentElement.className === "numbersDiv" && operator !== "") {
                secondOperand = calculator.setOperand(clickedValue, secondOperand);
                calculator.display(secondOperand);
            // operator
            // select operator and/or calculate 
            } else if(elementClicked.parentElement.className === "operatorsDiv") {
                // reset calculator
                if(clickedValue === "C") {
                    firstOperand = "";
                    secondOperand = "";
                    operator = "";
                    calculator.display(0);
                // select operator
                } else if((operator === "" || operator === "=" || secondOperand === "") && firstOperand !== "" && clickedValue !== "=") {
                        operator = clickedValue;    
                } else {
                     // if "=" was clicked, calculate only if second operand was set
                     if(clickedValue === "=") {
                       if(secondOperand !== "") {
                            firstOperand = calculator.calculate(firstOperand, secondOperand, operator);
                       } 
                     } else {
                        firstOperand = calculator.calculate(firstOperand, secondOperand, operator);
                     }
                     secondOperand = "";
                     operator = clickedValue;
                     calculator.display(firstOperand);
                }
            }
        });
    },
    setOperand: function(clickedValue, operand) {
        if(clickedValue === "+/-") {
            // negate(operand)
            operand = (Number(operand) * (-1)).toString();  
        } else if(operand.length < 11) { // max length of operand is 11
            if(clickedValue === "0") {
                // "0" can be added only if operand value is not 0
                if(operand !== "0") {
                    operand += clickedValue;    
                }
            // only one "." can be in operand
            } else if(clickedValue === "." && !operand.includes(".")){
                // add "0" in front of "." if it's first in operand
                if(operand.length === 0) {
                    operand += "0";
                }
                operand += clickedValue;
            }  else if(clickedValue !== ".") {
                // eliminate "0" if it's clicked before number
                if(operand === "0"){
                    operand = clickedValue;
                } else {
                    operand += clickedValue;    
                }
            }
        }
        return operand;
    },
    calculate : function(firstOperand, secondOperand, operator) {
        var result = 0;
        var firstNumber = Number(firstOperand);
        var secondNumber = Number(secondOperand);
        switch(operator) {
            case "+": {
                result = firstNumber + secondNumber;
                break;
            }
            case "-": {
                result = firstNumber - secondNumber;
                break;
            }
            case "*": {
                result = firstNumber * secondNumber;
                break;
            }
            case "/": {
                if(firstNumber === 0 || secondNumber === 0) {
                    result = 0;
                } else {
                    result = firstNumber / secondNumber;    
                }
                break;
            }
        }
        // dummy result format
        result = Number(result.toString().substr(0, 11));
        return result.toString();
    }
}


document.addEventListener("DOMContentLoaded", function() {
    calculator.display(0);
    calculator.setListener();
});
