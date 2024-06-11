
let buttons = document.getElementsByClassName('button');

for (let element of buttons) {
    if (element.classList.contains('clearAll')) {
        element.addEventListener('click', (event) => {
            document.getElementsByTagName('input')[0].value = "";
        });
    }
    else {
        if (element.classList.contains('clearOne')) {
            element.addEventListener('click', (event) => {
                document.getElementsByTagName('input')[0].value = (document.getElementsByTagName('input')[0].value).slice(0, document.getElementsByTagName('input')[0].value.length - 1);
            });
        } else {
            if (element.classList.contains('equals')) {
                element.addEventListener('click', () => {
                    let inputField = document.getElementsByTagName('input')[0];
                    let exp = inputField.value;
                    console.log(exp);
                    console.log(toPostFix(exp))
                    let result = calc(exp);
                    console.log(result);
                    inputField.value = isFinite(result) ? result : "Error";  // Update input field
                });
            } else {
                element.addEventListener('click', (event) => {
                    document.getElementsByTagName('input')[0].value = (document.getElementsByTagName('input')[0].value) + event.target.textContent + " ";
                });
            }
        }
    }
}


function precedence(char) {
    switch(char) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
    }
}

function toPostFix(str) {
    str = str.trim();
    str = str.split(" ")
    let operators = ['+', '-', '*', '/'];
    let postFixExp = "";
    let opStack = [];

    for (let char of str) {
        if (operators.includes(char)) {
            if ((precedence(char) > precedence(opStack.at(-1)) || opStack.includes('(')) || opStack.length === 0) {opStack.push(char);}
            else {
                while (opStack.length > 0 && precedence(opStack.at(-1)) >= precedence(char)) {
                    postFixExp += opStack.pop() + " ";
                }
                opStack.push(char + " ");
            }
        }
        else {
            if (char === ')') {
                while (opStack.at(-1) !== '(' && opStack.length > 0) {
                    postFixExp += opStack.pop() + " ";
                }
                opStack.pop();
            }
            else {
                if (char === '(') opStack.push(char);
                else {
                    postFixExp += char + " ";
                }
            }
        }
    }

    while (opStack.length > 0) {
        postFixExp += opStack.pop() + " ";
    }

    return postFixExp;
}

function postFixEvaluator(str) {
    let stack = [];
    let operators = ['+', '-', '*', '/'];
    str = str.trim();
    str = str.split(" ")
    for (let element of str) {
        if (!operators.includes(element)) {
            stack.push(element);
        }
        else {
            let operand2 = +stack.pop();
            let operand1 = +stack.pop();

            stack.push(Evaluate(operand1, operand2, element))
        }
    }

    return +stack.pop();
}

function Evaluate(operand1, operand2, operator) {
    switch(operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
        default:
            console.error('Unknown operator: ', operator);
    }
}

function calc(str) {
    return postFixEvaluator(toPostFix(str));
}
