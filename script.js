const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;

function updateDisplay() {
    display.value = currentInput || '0';
}

// Handling button presses
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const value = this.getAttribute('data-value');

        // Clear the display
        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = null;
            updateDisplay();
            return;
        }

        // Handling operators
        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput !== '') {
                previousInput = currentInput;
                currentInput = '';
            }
            operator = value;
            return;
        }

        // Handle equals
        if (value === '=') {
            if (operator && previousInput !== '' && currentInput !== '') {
                currentInput = operate(operator, previousInput, currentInput);
                operator = null;
                previousInput = '';
                updateDisplay();
            }
            return;
        }

        // Handling decimal point
        if (value === '.' && currentInput.includes('.')) return;

        // Append number to the current input
        currentInput += value;
        updateDisplay();
    });
});

// Operations function
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            return b !== 0 ? (a / b).toString() : 'Error';
        default:
            return b;
    }
}
