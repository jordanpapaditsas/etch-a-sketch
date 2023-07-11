const gridContainer = document.querySelector('#gridContainer');
const colorPicker = document.querySelector('#rbgPicker');
const fillAllBtn = document.querySelector('#fill');
const eraseBtn = document.querySelector('#erase');
const rainbowBtn = document.querySelector('#rainbow');
const gridSizeBar = document.querySelector('#inputSize');
const clearAllBtn = document.querySelector('#clear');

const DEFAULT_COLOR = '#fafafa';

// Creates a grid of 16 x 16
function createGrid() {
  for (let i = 0; i < 256; i++) {
    let gridCell = document.createElement('div');
    gridCell.classList.add('cell');
    gridCell.style.border = '1px solid lightgray';
    gridContainer.appendChild(gridCell);
  };
};
createGrid();

// Selects the whole grid
const gridCells = document.querySelectorAll('.cell');

// Choose and apply color as the current color
colorPicker.addEventListener('input', pickColor);
 
// Picks a color from the rbg color palette
function pickColor() {
  document.getElementById('lblColor').innerHTML = colorPicker.value;
  gridCells.forEach((cell) => {
    cell.removeEventListener('mouseover', applyRandomColor);
    cell.addEventListener('mouseover', applyColor);
  });
};

// Applying color as the current color
function applyColor(event) {
  event.target.style.backgroundColor = colorPicker.value;
};

// Change to Rainbow color option
rainbowBtn.addEventListener('click', changeToRainbowColor);

function changeToRainbowColor() {
  gridCells.forEach((cell) => {
    cell.removeEventListener('mouseover', applyColor);
    cell.addEventListener('mouseover', applyRandomColor);
  });
};

function applyRandomColor(event) {
  const randomColor = getRandomColor();
  event.target.style.backgroundColor = randomColor;
};

// Gets a random color
function getRandomColor() {
  const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  let color = '#';

  const hexColor = [...letters, ...num];

  for (let i = 1; i <= 6; i++) {
      let randomCol = Math.floor(Math.random() * hexColor.length);
      color  += hexColor[randomCol];    
  };
  return color;
};

// Changed the current color to white
eraseBtn.addEventListener('click', eraseColor);

function eraseColor() {
 gridCells.forEach((cell) => {
  cell.removeEventListener('mouseover', applyRandomColor);
  cell.removeEventListener('mouseover', applyColor);
  cell.addEventListener('mouseover', applyEraseColor);
 });
};

function applyEraseColor(event) {
  event.target.style.backgroundColor = DEFAULT_COLOR;
}

// Clears the whole grid and adds the default color
clearAllBtn.addEventListener('click', clearAllGrid);

function clearAllGrid() {
  if (clearAllBtn) {
    gridCells.forEach((cell) => {
      cell.style.backgroundColor = DEFAULT_COLOR;
    });
  };
};

// Fills the whole grid with the current color
fillAllBtn.addEventListener('click', fillAllGrid);

function fillAllGrid() {
  if (fillAllBtn) {
    gridCells.forEach((cell) => {
      cell.style.backgroundColor = colorPicker.value;
    });
  };
};