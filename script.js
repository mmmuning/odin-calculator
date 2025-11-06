const equationDisplay = document.querySelector("#equation-display");
const resultDisplay = document.querySelector("#result-display");
const buttonsContainer = document.querySelector(".buttons-container");

let currentEquation = "";
let currentDisplayNum = "";
let currentOperator = "";
let num1 = null;
let num2 = null;

// --- Basic Math Operations ---
function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  if (num2 === 0) {
    alert("Oops! You can't divide by zero, unfortunately.");
    return 0;
  }
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      console.log("Invalid operator.");
  }
}

// --- Display Helpers ---
function populateEquationDisplay(equation) {
  currentEquation = equation;
  equationDisplay.value = currentEquation;
}

function populateResultDisplay(num) {
  resultDisplay.value = Number(num).toLocaleString();
}

function clearEquationDisplay() {
  currentEquation = "";
  equationDisplay.value = "";
}

function clearResultDisplay() {
  currentDisplayNum = "";
  resultDisplay.value = "";
}

function clearAll() {
  clearEquationDisplay();
  clearResultDisplay();
  num1 = null;
  num2 = null;
  currentOperator = "";
}

function deleteNumEntry() {
  currentDisplayNum = currentDisplayNum.slice(0, -1);
  resultDisplay.value = currentDisplayNum;
}

// --- Operator Handler ---
function handleOperator(nextOperator) {
  // Case 1: We already have num1 and operator, so we can proceed to store num2 and operate
  if (currentOperator && currentDisplayNum !== "") {
    num2 = Number(currentDisplayNum);
    populateEquationDisplay(`${num1} ${currentOperator} ${num2}`);

    const result = operate(currentOperator, num1, num2);
    populateResultDisplay(result);

    // Carry forward the result
    num1 = result;
    currentDisplayNum = "";
  }
  // Case 2: First time pressing operator, store num1
  else if (currentDisplayNum !== "") {
    num1 = Number(currentDisplayNum);
    populateEquationDisplay(`${num1} ${nextOperator}`);
    currentDisplayNum = "";
  }

  // Case 3: Pressing operator twice, just update it
  currentOperator = nextOperator;
  populateEquationDisplay(`${num1} ${currentOperator}`);
}

// --- Action Handler ---
function handleAction(button) {
  if (button === "equal") {
    if (currentOperator && currentDisplayNum !== "") {
      num2 = Number(currentDisplayNum);
      populateEquationDisplay(`${num1} ${currentOperator} ${num2}`);

      const result = operate(currentOperator, num1, num2);
      populateResultDisplay(result);

      // Prepare for new operation
      num1 = result;
      currentDisplayNum = "";
      currentOperator = "";
    }
  }

  if (button === "clear") clearAll();
  if (button === "delete") deleteNumEntry();
}

// --- Number Handler ---
function handleNumberInput(value) {
  // Prevent multiple decimals
  if (value === "." && currentDisplayNum.includes(".")) return;

  // If user presses "." first, prefix with 0
  if (value === "." && currentDisplayNum === "") {
    currentDisplayNum = "0.";
  } else {
    currentDisplayNum += value;
  }

  resultDisplay.value = currentDisplayNum;
}

// --- Button Event Listener ---
buttonsContainer.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  if (button.dataset.number) {
    handleNumberInput(button.dataset.number);
    return;
  }

  if (button.dataset.operator) {
    handleOperator(button.dataset.operator);
    return;
  }

  if (button.dataset.action) {
    handleAction(button.dataset.action);
    return;
  }
});

// --- Keyboard Support ---
resultDisplay.addEventListener("keydown", (e) => {
  const key = e.key;

  // Prevent default typing
  e.preventDefault();

  if (key >= "0" && key <= "9") {
    currentDisplayNum += key;
    populateResultDisplay(currentDisplayNum);
  } else if (key === ".") {
    if (!currentDisplayNum.includes(".")) {
      currentDisplayNum += ".";
      populateResultDisplay(currentDisplayNum);
    }
  } else if (key === "Backspace") {
    deleteNumEntry();
  }
});
