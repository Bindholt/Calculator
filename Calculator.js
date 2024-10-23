import Stack from "./stack.js";
import Queue from "./queue.js";

function RPNCalculator(input) {
    const inputStack = input.split(" ");
    const resultStack = [];

    for(input in inputStack) {
        if(!isNaN(inputStack[input])) {
            inputStack[input] = Number(inputStack[input]);
            resultStack.push(inputStack[input]);
        } else {
            const num1 = resultStack.pop();
            const num2 = resultStack.pop();

            switch(inputStack[input]){
                case "+":
                    resultStack.push(num1 + num2);
                    break;
                case "*":
                    resultStack.push(num1 * num2);
                    break;
                case "-":
                    resultStack.push(num2 - num1);
                    break;
                case "^":
                    resultStack.push(num2 ** num1);
                    break;
                case "/":
                    resultStack.push(num2/num1);
                    break;
                default:
                    break;
            }
        }
    }
    return resultStack;
}


function shuntingYardConversion(dataStr) {
    const {inputQueue, outputQueue, operatorStack} = setupData(dataStr);
    let returnStr = "";

    let currentInput = inputQueue.getHead();

    while(currentInput) {
        if(!isNaN(currentInput.data)) {
            outputQueue.push(currentInput.data);
        } else {
            operatorStack.push(currentInput.data);
            
        }

        currentInput = currentInput.next;
    }

    let currentOperator = operatorStack.peek();
    
    while(currentOperator) {
        const operator = operatorStack.pop();
        outputQueue.push(operator.data);
        currentOperator = operatorStack.peek();
    }

    let currentOutput = outputQueue.getHead();

    while(currentOutput) {
        console.log(currentOutput.data);
        returnStr += currentOutput.data + " ";
        currentOutput = currentOutput.next;
    }
    return returnStr.trim();
}

function setupData(dataStr) {
    const inputQueue = new Queue();
    const outputQueue = new Queue();
    const operatorStack = new Stack();
    const inputs = dataStr.split(" ");
    inputs.forEach(e => {
        inputQueue.push(e);
    });

    return {inputQueue, outputQueue, operatorStack};
}

function realCalculator(input) {
    const RPNInput = shuntingYardConversion(input);
    return RPNCalculator(RPNInput);
}

console.log(realCalculator("3 + 4"));