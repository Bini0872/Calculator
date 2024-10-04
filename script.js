const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const equalsButton = document.getElementById('equals');

let currentInput = '';
let operator = '';
let firstOperand = '';

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.getAttribute('data-value');

        if (value === 'C') {
            currentInput = '';
            firstOperand = '';
            operator = '';
        } else {
            currentInput += value;
        }
        display.value = currentInput;
    });
});

equalsButton.addEventListener('click', function() {
    if (currentInput !== '' && operator !== '') {
        const secondOperand = currentInput;
        let result;

        switch (operator) {
            case '+':
                result = parseFloat(firstOperand) + parseFloat(secondOperand);
                break;
            case '-':
                result = parseFloat(firstOperand) - parseFloat(secondOperand);
                break;
            case '*':
                result = parseFloat(firstOperand) * parseFloat(secondOperand);
                break;
            case '/':
                result = parseFloat(firstOperand) / parseFloat(secondOperand);
                break;
            default:
                return;
        }

        display.value = result;
        currentInput = '';
        firstOperand = result;
        operator = '';
    } else {
        operator = currentInput[currentInput.length - 1];
        firstOperand = currentInput.slice(0, -1);
        currentInput = '';
    }
});

// Add event listeners for operator buttons
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', function() {
        operator = this.getAttribute('data-value');
        if (currentInput !== '') {
            firstOperand = currentInput;
            currentInput += operator; // Store the operator in currentInput
        }
    });
});