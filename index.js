const gridContainer = document.querySelector('#gridContainer');
const colorPicker = document.querySelector('#rgbPicker');
const fillAllBtn = document.querySelector('#fill');
const eraseBtn = document.querySelector('#erase');
const rainbowBtn = document.querySelector('#rainbow');
const gridSizeBar = document.querySelector('#inputSize');
const sizeValue = document.querySelector('#valueRange');
const clearAllBtn = document.querySelector('#clear');

const DEFAULT_COLOR = '#fafafa';
let gridCells = [];

// Creates a grid from a users choice size
function createGrid() {
  let cells = gridSizeBar.value;
  let containerSize = gridContainer.offsetWidth;
  let cellSize = containerSize / cells;

  // Remove existing cells
  gridCells.forEach((cell) => {
    cell.remove();
  });

  // Create new cells
  for (let i = 0; i < cells * cells; i++) {
    let gridCell = document.createElement('div');
    gridCell.classList.add('cell');
    gridCell.style.border = '1px solid lightgray';
    gridCell.style.width = `${cellSize}px`;
    gridCell.style.height = `${cellSize}px`;
    gridContainer.appendChild(gridCell);
    gridCells.push(gridCell);
  }

  reActivateEventListeners();
}
createGrid();

// displays the num value of the slider
gridSizeBar.addEventListener('change', (event) => {
  const tempSizeValue = event.target.value;
  sizeValue.textContent = tempSizeValue;
});

// Applying event to the slider for controlling the grid's size
gridSizeBar.addEventListener('input', createGrid);


// Reactivates all event listeners after the new grid cells are created
function reActivateEventListeners() {
  const gridCells = document.querySelectorAll('.cell');

  colorPicker.addEventListener('input', pickColor);

  rainbowBtn.addEventListener('click', changeToRainbowColor);

  eraseBtn.addEventListener('click', eraseColor);

  clearAllBtn.addEventListener('click', clearAllGrid);

  fillAllBtn.addEventListener('click', fillAllGrid);

  // Attaches event listener to each grid cell
  gridCells.forEach((cell) => {
    cell.addEventListener('mouseover', applyColor);
  });
};

// Chooses and applys color as the current color
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

// Apply a random color as the current color
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

// Changes the current color to white
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
    colorPicker.value = DEFAULT_COLOR;
    gridSizeBar.value = 16;
    sizeValue.textContent = 16;
    createGrid();
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

// Extra features







