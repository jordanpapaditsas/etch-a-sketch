// Selectors and variables initialization
const gridContainer = document.querySelector('#gridContainer');
const colorPicker = document.querySelector('#rbgPicker');
const clearAllBtn = document.querySelector('#clear');
const fillAllBtn = document.querySelector('#fill');
const eraseBtn = document.querySelector('#erase');
const rainbowBtn = document.querySelector('#rainbow');

const DEFAULT = 'white';

// Creates a grid of 16 x 16
function createGrid() {
  for (let i = 0; i < 256; i++) {
    let gridCell = document.createElement('div');
    gridCell.classList.add('cell');
    gridContainer.appendChild(gridCell);
  };
};
createGrid();

// Selects all cell elements
const gridCell = document.querySelectorAll('.cell');

// Traversing through each cell and applies them the fillColor function 
gridCell.forEach((cell) => {
  cell.addEventListener('mouseover', () => {
    fillColor(cell);
  });
});

//  Adds a color on the chosen cell
function fillColor(cell) {
  cell.style.backgroundColor = colorPicker.value;
};

// Displays the current color choice 
colorPicker.addEventListener('input', () => {
  document.getElementById('lblColor').innerHTML = colorPicker.value;
});


// Removes color from the chosen cell


// Removes color from every cell
clearAllBtn.addEventListener('click', clearAll);

function clearAll() {
  gridCell.forEach(cell => {
    cell.style.backgroundColor = DEFAULT;
  });
};


// Fills every cell with the color of your choice
fillAllBtn.addEventListener('click', fillAllGrid);

function fillAllGrid() {
  gridCell.forEach(cell => {
    cell.style.backgroundColor = colorPicker.value;
  });
};

