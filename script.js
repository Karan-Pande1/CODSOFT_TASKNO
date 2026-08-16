// State variables
let currentInput = '0';
let previousInput = '';
let operator = null;

const currentOperandDisplay = document.getElementById('current-operand');
const previousOperandDisplay = document.getElementById('previous-operand');

// Update Display Screen
function updateDisplay() {
  currentOperandDisplay.innerText = currentInput;
  if (operator !== null) {
    previousOperandDisplay.innerText = `${previousInput} ${operator}`;
  } else {
    previousOperandDisplay.innerText = '';
  }
}

// Append Number to Display
function appendNumber(number) {
  if (number === '.' && currentInput.includes('.')) return;
  if (currentInput === '0' && number !== '.') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

// Handle Operator Selection
function appendOperator(op) {
  if (currentInput === '' && previousInput === '') return;

  if (previousInput !== '' && currentInput !== '') {
    calculate();
  } else if (currentInput !== '') {
    previousInput = currentInput;
  }

  operator = op;
  currentInput = '';
  updateDisplay();
}

// Perform Calculation Logic
function calculate() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  // Decision logic using switch/if statement
  switch (operator) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
      computation = prev * current;
      break;
    case '÷':
      if (current === 0) {
        alert("Cannot divide by zero!");
        clearDisplay();
        return;
      }
      computation = prev / current;
      break;
    case '%':
      computation = (prev * current) / 100;
      break;
    default:
      return;
  }

  // Format result to avoid long floating point decimals
  currentInput = Math.round(computation * 1000000) / 1000000 + '';
  operator = null;
  previousInput = '';
  updateDisplay();
}

// Clear Display (AC)
function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  updateDisplay();
}

// Delete Last Character (DEL)
function deleteNumber() {
  if (currentInput.length === 1 || currentInput === '0') {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

// Event Listener for Keyboard Support
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || key === '.') {
    appendNumber(key);
  } else if (key === '+') {
    appendOperator('+');
  } else if (key === '-') {
    appendOperator('-');
  } else if (key === '*') {
    appendOperator('×');
  } else if (key === '/') {
    event.preventDefault();
    appendOperator('÷');
  } else if (key === '%') {
    appendOperator('%');
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    deleteNumber();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});