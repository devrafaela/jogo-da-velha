const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const restartButton = document.querySelector("[data-restart-button]");
const changeLevelButton = document.querySelector("[data-change-level-button]");
const levelModal = document.querySelector("[data-level-modal]");
const levelButtons = levelModal.querySelectorAll("button");
const backToMenuButton = document.getElementById("backToMenu");

let aiLevel;
let isCircleTurn;

const winnerCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Inicializa jogo
const startGame = () => {
  if(!aiLevel) return;
  isCircleTurn = false;

  cellElements.forEach(cell => {
    cell.classList.remove("x","circle");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  winningMessage.style.display = "none";
  board.style.display = "grid";
  setBoardHoverClass();
};

// Fim de jogo
const endGame = (isDraw) => {
  winningMessageTextElement.innerText = isDraw ? "Empate!" : (isCircleTurn ? "O venceu!" : "X venceu!");
  winningMessage.style.display = "flex";
};

// Verifica vitória
const checkForWin = player => 
  winnerCombinations.some(comb => comb.every(i => cellElements[i].classList.contains(player)));

// Verifica empate
const checkForDraw = () => [...cellElements].every(c => c.classList.contains("x") || c.classList.contains("circle"));

// Marca X ou O
const placeMark = (cell, mark) => cell.classList.add(mark);

// Atualiza hover
const setBoardHoverClass = () => {
  board.classList.remove("x","circle");
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

    const chosenCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
    placeMark(chosenCell, "circle");

    if(checkForWin("circle")) endGame(false);
    else if(checkForDraw()) endGame(true);
    else swapTurns();
  }, 500);
};

// Clique humano
const handleClick = e => {
  const cell = e.target;
  const mark = isCircleTurn ? "circle":"x";
  placeMark(cell, mark);

  if(checkForWin(mark)) endGame(false);
  else if(checkForDraw()) endGame(true);
  else { swapTurns(); if(isCircleTurn) aiMove(); }
};

// Botões
restartButton.addEventListener("click", startGame);

changeLevelButton.addEventListener("click", ()=>{
  winningMessage.style.display = "none";
  board.style.display = "none";
  levelModal.style.display = "flex";
});

// Escolha do nível
levelButtons.forEach(btn => btn.addEventListener("click", ()=>{
  aiLevel = btn.dataset.level;
  levelModal.style.display = "none";
  startGame();
}));

// Ao carregar página
window.addEventListener("load", ()=>{
  levelModal.style.display = "flex";
  board.style.display = "none";
});

// Clicar em voltar ao menu
backToMenuButton.addEventListener("click", () => {
  window.location.href = "../index.html"; // volta para o menu
});
