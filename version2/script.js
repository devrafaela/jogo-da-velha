const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const restartButton = document.querySelector("[data-restart-button]");
const changeLevelButton = document.querySelector("[data-change-level-button]");
const levelModal = document.querySelector("[data-level-modal]");
const levelButtons = levelModal.querySelectorAll("button");

let aiLevel; // nível escolhido pelo usuário
let isCircleTurn; // false = humano (X), true = IA (O)

const winnerCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Inicializa o jogo
const startGame = () => {
  if(!aiLevel) return; // não começa sem nível
  isCircleTurn = false;

  cellElements.forEach(cell => {
    cell.classList.remove("x","circle");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  setBoardHoverClass();
  winningMessage.style.display = "none"; // esconde a mensagem
  board.style.display = "grid"; // mostra o tabuleiro
};

// Exibe mensagem de fim de jogo
const endGame = (isDraw) => {
  winningMessageTextElement.innerText = isDraw ? "Empate!" : (isCircleTurn ? " 'O' venceu! " : " 'X' venceu! ");
  winningMessage.style.display = "flex"; // garante que a mensagem apareça
};

// Verifica vitória
const checkForWin = currentPlayer => 
  winnerCombinations.some(combination => 
    combination.every(index => cellElements[index].classList.contains(currentPlayer))
  );

// Verifica empate
const checkForDraw = () => 
  [...cellElements].every(cell => cell.classList.contains("x") || cell.classList.contains("circle"));

// Marca X ou O
const placeMark = (cell,classToAdd) => cell.classList.add(classToAdd);

// Atualiza hover
const setBoardHoverClass = () => {
  board.classList.remove("circle","x");
  board.classList.add(isCircleTurn ? "circle" : "x");
};

// Alterna turno
const swapTurns = () => { 
  isCircleTurn = !isCircleTurn; 
  setBoardHoverClass(); 
};

// Movimento IA
const aiMove = () => {
  setTimeout(()=>{
    const emptyCells = [...cellElements].filter(c => !c.classList.contains("x") && !c.classList.contains("circle"));
    if(emptyCells.length === 0) return;

    let chosenCell;
    if(aiLevel === "easy") chosenCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
    else if(aiLevel === "medium") chosenCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
    else chosenCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];

    placeMark(chosenCell,"circle");

    if(checkForWin("circle")) endGame(false);
    else if(checkForDraw()) endGame(true);
    else swapTurns();
  },500);
};

// Clique humano
const handleClick = e => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle":"x";
  placeMark(cell,classToAdd);

  if(checkForWin(classToAdd)) endGame(false);
  else if(checkForDraw()) endGame(true);
  else { swapTurns(); if(isCircleTurn) aiMove(); }
};

// Botões
restartButton.addEventListener("click", startGame);

changeLevelButton.addEventListener("click", () => {
  board.style.display = "none";
  winningMessage.style.display = "none";
  levelModal.style.display = "flex";
});

// Escolha do nível
levelButtons.forEach(btn => btn.addEventListener("click", () => {
  aiLevel = btn.dataset.level;
  levelModal.style.display = "none";
  startGame();
}));

// Ao carregar a página
window.addEventListener("load", () => {
  levelModal.style.display = "flex";
  board.style.display = "none";
  winningMessage.style.display = "none";
});
