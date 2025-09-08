const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winnerCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, {once: true});
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
}

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn 
      ? " 'O' venceu! " 
      : " 'X' venceu! ";
  }
  winningMessage.classList.add("show-winning-message");
}

const checkForWin = (currentPlayer) => {
  return winnerCombinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentPlayer);
    })
  })
}

const checkForDraw = () => {
  return [...cellElements].every(cell => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  })
}

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
}

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
}

const handleClick = (e) => {
  // Colocar X ou O
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";
  
  placeMark(cell, classToAdd);
  
  // Verificar vitória
  const isWin = checkForWin(classToAdd);

  // Verificar empate
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar simbolo
    swapTurns();
  }
}

startGame(); 
restartButton.addEventListener("click", startGame);