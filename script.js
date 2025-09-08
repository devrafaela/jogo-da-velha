const cellElements = document.querySelectorAll("[data-cell]");

let isCircleTurn = false;

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
}

const handleClick = (e) => {
  
  // Colocar X ou O
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";
  placeMark(cell, classToAdd);
  
  // Verificar vitória
  // Verificar empate  
  // Mudar simbolo
};

for (const cell of cellElements) {
  cell.addEventListener("click", handleClick, {once: true});
}