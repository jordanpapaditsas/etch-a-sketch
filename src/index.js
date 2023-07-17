// Initializing and selecting elements
const gridContainer = document.querySelector('#grid-container');
const colorPicker = document.querySelector('#rgb-picker');
const labelColor = document.querySelector('#lbl-color');
const fillWholeBtn = document.querySelector('#fill');
const eraseBtn = document.querySelector('#erase');
const rainbowBtn = document.querySelector('#rainbow');
const darkenBtn = document.querySelector('#darken');
const gridSizeBar = document.querySelector('#input-size');
const sizeValue = document.querySelector('#grid-size');
const resetAllBtn = document.querySelector('#clear');

const DEFAULT_COLOR = '#000000';
const ERASOR_COLOR = '#fafafa';
let gridCells = [];

// Creates a grid, and gives a size upon the user's choice via a slider
function createGrid() {
  let cells = gridSizeBar.value;
  let containerSize = gridContainer.offsetWidth;
  let cellSize = containerSize / cells;

  // Removes existing cells
  gridCells.forEach((cell) => {
    cell.remove();
  });

  // Creates new cells and pushing them to the new array of cells
  for (let i = 0; i < cells * cells; i++) {
    let gridCell = document.createElement('div');
    gridCell.classList.add('cell');
    gridCell.style.cssText = 'border: 1px solid lightgray; background-color: white;';
    gridCell.style.width = `${cellSize}px`;
    gridCell.style.height = `${cellSize}px`;
    gridContainer.appendChild(gridCell);
    gridCells.push(gridCell);
  };

  reactivateEventListeners();
};
createGrid();

// Reactivates all event listeners after the new grid cells are created
function reactivateEventListeners() {
  const gridCells = document.querySelectorAll('.cell');

  colorPicker.addEventListener('click', pickColor);

  rainbowBtn.addEventListener('click', changeToRandomColor);

  eraseBtn.addEventListener('click', changeToErasorColor);

  resetAllBtn.addEventListener('click', resetAllGrid);

  fillWholeBtn.addEventListener('click', fillWholeGrid);

  // Attach an event listener to each grid cell
  gridCells.forEach((cell) => {
    cell.addEventListener('mouseover', applyColor);
  });
};

// Displays the value of the slider, as an integer 
gridSizeBar.addEventListener('input', (event) => {
  const tempSizeValue = event.target.value;
  sizeValue.textContent = tempSizeValue;
});

// Applies an event to the slider, for controlling the grid's size
gridSizeBar.addEventListener('input', createGrid);

// Adds an event with the current color
colorPicker.addEventListener('mouseover', pickColor);

// Adds an event to update the color code text dynamically
colorPicker.addEventListener('input', updateColorLabel);

// Picks a color from the rgb color palette
function pickColor() {
  document.getElementById('lbl-color').innerHTML = colorPicker.value;
  gridCells.forEach((cell) => {
    cell.removeEventListener('mouseover', applyRandomColor);
    cell.addEventListener('mouseover', applyColor);
  });
};

// Applies a color as the current color
function applyColor(event) {
  event.target.style.backgroundColor = colorPicker.value;
};

// Updates the color code text dynamically
function updateColorLabel() {
  labelColor.textContent = colorPicker.value;
};

// Adds an event with the random color function
rainbowBtn.addEventListener('click', changeToRandomColor);

// Swaps the current color with the random color option
function changeToRandomColor() {
  gridCells.forEach((cell) => {
    cell.removeEventListener('mouseover', applyColor);
    cell.addEventListener('mouseover', applyRandomColor);
  });
};

// Applies a random color as the current color
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

// Swaps the current color to ERASOR_COLOR (white color)
eraseBtn.addEventListener('click', changeToErasorColor);

function changeToErasorColor() {
 gridCells.forEach((cell) => {
  cell.removeEventListener('mouseover', applyRandomColor);
  cell.removeEventListener('mouseover', applyColor);
  cell.removeEventListener('mouseover', applyDarkeningEffect)
  cell.addEventListener('mouseover', applyErasorColor);
 });
};

// Applies an erasor option
function applyErasorColor(event) {
  event.target.style.backgroundColor = ERASOR_COLOR;
}

// Clears the whole grid, and returns everything to default
resetAllBtn.addEventListener('click', resetAllGrid);

function resetAllGrid() {
  if (resetAllBtn) {
    colorPicker.value = DEFAULT_COLOR;
    labelColor.textContent = 'Color Picker';
    gridSizeBar.value = 16;
    sizeValue.textContent = 16;
    createGrid();
  };
};

// Fills the whole grid with the current color
fillWholeBtn.addEventListener('click', fillWholeGrid);

function fillWholeGrid() {
  if (fillWholeBtn) {
    gridCells.forEach((cell) => {
      cell.style.backgroundColor = colorPicker.value;
    });
  };
};

// Extra features
darken.addEventListener('click', applyDarkeningEffect);

function applyDarkeningEffect() {
  gridCells.forEach((cell) => {
    cell.removeEventListener('mouseover', applyColor);
    cell.removeEventListener('mouseover', applyRandomColor);
    cell.removeEventListener('mouseover', applyErasorColor);
    cell.addEventListener('mouseover', getDarkeningEffect);
  });
};

/**
 *  Checks if the current grid cell has already a darkened background color with the data
 *  percent attribute, if the data percent is not a valid number then sets
 *  the rgbPercentValue to 100.
 *  Then checks if the current darkness level (rgbPercentValue) is greater or equal to 10,
 *  if it is, then its decreasing the value by 10 for the purpose of darkening the color.
 *  Then reassigns the new value back to the data percent attribute of the targeted element.
 *  Creates a new variable 'rgbColor' to pass the new background color format.
 * @param {*} event 
 *              triggers when the event object is triggered by an action event. 
 */
function getDarkeningEffect(event) {
  let target = event.target;
  let rgbPercentValue = parseInt(target.dataset.percent);
  if (isNaN(rgbPercentValue)) {
    rgbPercentValue = 100;
  };
  if (rgbPercentValue >= 10) {
    rgbPercentValue -= 10;
    target.dataset.percent = rgbPercentValue;
  };

  let rgbColor = `rgb(${rgbPercentValue}%, ${rgbPercentValue}%, ${rgbPercentValue}%)`;

  if (target) {
    target.style.backgroundColor = rgbColor;
  };
};





