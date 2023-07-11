// Selectors and initialization
const gridContainer = document.querySelector('#gridContainer');
const colorPicker = document.querySelector('#rbgPicker');
const clearAllBtn = document.querySelector('#clear');
const fillAllBtn = document.querySelector('#fill');
const eraseBtn = document.querySelector('#erase');
const rainbowBtn = document.querySelector('#rainbow');

const DEFAULT = 'white';
let isRainbowBtnActive = false;

// Creates a grid of 16 x 16
function createGrid() {
  for (let i = 0; i < 256; i++) {
    let gridCell = document.createElement('div');
    gridCell.classList.add('cell');
    gridContainer.appendChild(gridCell);
  };
};
createGrid();

// Select all cell elements
const gridCell = document.querySelectorAll('.cell');

// Traversing through each cell and applies them the fillColor function 
gridCell.forEach((cell) => {
  cell.addEventListener('mouseover', () => {
    if (!isRainbowBtnActive) {
      fillColor(cell);
    };
  });
});

//  Applies a color of the users choice
function fillColor(cell) {
  cell.style.backgroundColor = colorPicker.value;
};

// Displays the current color choice 
colorPicker.addEventListener('input', () => {
  document.getElementById('lblColor').innerHTML = colorPicker.value;
});

//Rainbow color choice 
rainbowBtn.addEventListener('click', () => {
  isRainbowBtnActive = !isRainbowBtnActive;

  if (isRainbowBtnActive) {
    gridCell.forEach((cell) => {
      cell.removeEventListener('mouseover', fillColor);
      cell.addEventListener('mouseover', getRainbowColor);
    })
  } else if (!isRainbowBtnActive) {
    gridCell.forEach((cell) => {
      cell.removeEventListener('mouseover', getRainbowColor);
      cell.addEventListener('mouseover', fillColor);
      // cell.style.backgroundColor = cell.currentColor;
    });
  };
});

// Gets a random color
function getRainbowColor(event) {
  const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  let color = '#';

  const hexColor = [...letters, ...num];

  for (let i = 1; i <= 6; i++) {
      let randomCol = Math.floor(Math.random() * hexColor.length);
      color  += hexColor[randomCol];    
  }
  event.target.style.backgroundColor = color;
};

// Removes color from every cell
clearAllBtn.addEventListener('click', clearAll);

function clearAll() {
  gridCell.forEach(cell => {
    cell.style.backgroundColor = DEFAULT;
  });
};

// Fills the whole grid of the users color choice
fillAllBtn.addEventListener('click', fillAllGrid);

function fillAllGrid() {
  gridCell.forEach(cell => {
    cell.style.backgroundColor = colorPicker.value;
  });
};

