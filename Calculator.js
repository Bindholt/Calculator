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
    const resultStack = new Stack();
    const inputQueue = new Queue();

    const inputs = input.split(" ");
    inputs.forEach(input => {
        inputQueue.push(input);
    });

    let currentInput = inputQueue.getHead();
    while(currentInput) {
        const token = currentInput.data;
        if(!isNaN(token)) {
            resultStack.push(Number(token));
        } else {
            const num1 = resultStack.pop().data;
            const num2 = resultStack.pop().data;

            switch(token){
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
        currentInput = currentInput.next;
    }
    return resultStack.peek().data;
}


function shuntingYardConversion(dataStr) {
    const {inputQueue, outputQueue, operatorStack} = setupData(dataStr);
    let returnStr = "";

    let currentInput = inputQueue.getHead();

    while(currentInput) {
        if(!isNaN(currentInput.data)) {
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
// console.log(RPNCalculator("3 4 5 + *"))
