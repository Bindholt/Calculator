import Stack from "./stack.js";
import Queue from "./queue.js";

const precedence = {
    "^": 5,
    "*": 4,
    "/": 3,
    "+": 2,
    "-": 1
}

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
            currentInput
            outputQueue.push(currentInput.data);
        } else if (currentInput.data != "(" && currentInput.data != ")") {
            let currentOperator = operatorStack.peek();
            while (
                currentOperator?.data != "(" && 
                (precedence[currentOperator?.data] > precedence[currentInput.data]) || 
                (precedence[currentOperator?.data] == precedence[currentInput.data] && currentInput.data != "^")
            ) {
                outputQueue.push(operatorStack.pop().data);
                currentOperator = currentOperator.next;
            }
            operatorStack.push(currentInput.data);
        } else if(currentInput.data == "(") {
            operatorStack.push(currentInput.data);
        } else if(currentInput.data == ")") {
            let currentOperator = operatorStack.peek();
            while(currentOperator.data != "(" && currentOperator.data != null) {
                outputQueue.push(operatorStack.pop().data);
                currentOperator = currentOperator.next;
            }
            if(operatorStack.peek().data == "(") {
                operatorStack.pop();
            }
        }

        console.log("Token: [" + currentInput.data + "] Output: [" + outputQueue.dumpList() + "] Operator: [" + operatorStack.dumpList() + "] ");
        console.log("====================================================================");
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
        returnStr += currentOutput.data + " ";
        currentOutput = currentOutput.next;
    }

    console.log(returnStr);
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

console.log(realCalculator("3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3"));

