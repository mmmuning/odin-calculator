// User inputs a string of numbers
// Once the user clicks any operator, save the string of numbers into num1 and the current chosen operator
// The user will then input a new string of numbers, and once they click any operator
// It should then operate those two numbers based on the current chosen operator

const resultDisplay = document.querySelector("#result-display");
const buttonsContainer = document.querySelector(".buttons-container");

let currentDisplayNum = "";
let currentOperator = "";
let num1,
  num2 = 0;

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
  if (num1 === 0) return 0;
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
    case "=":
      return; // Change later
    default:
      console.log("Invalid operator.");
  }
}

function populateDisplay(num) {
  currentDisplayNum += num;
  resultDisplay.value = Number(currentDisplayNum).toLocaleString();
}

function deleteNumEntry() {
  resultDisplay.value = currentDisplayNum.slice(0, -1);
  currentDisplayNum = resultDisplay.value;
}

function clearDisplay() {
  currentDisplayNum = "";
  resultDisplay.value = "";

  num1 = 0;
  num2 = 0;
}

buttonsContainer.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  if (button.dataset.number) {
    populateDisplay(button.dataset.number);
  }

  if (button.dataset.operator) {
    const nextOperator = button.dataset.operator;

    if (currentOperator && currentDisplayNum !== "") {
      num2 = Number(currentDisplayNum);
      console.log(`num2: ${num2}`);

      const result = operate(currentOperator, num1, num2);
      console.log(`result: ${result}`);

      clearDisplay();
      populateDisplay(result);

      num1 = result; // Result becomes the num1
      currentDisplayNum = "";
    } else {
      num1 = Number(currentDisplayNum);
      console.log(`num1: ${num1}`);
      currentDisplayNum = "";
    }

    currentOperator = nextOperator; // Store the operator for next round
    console.log(`operator: ${currentOperator}`);
  }

  if (button.dataset.action === "clear") clearDisplay();
  if (button.dataset.action === "delete") deleteNumEntry();
});
