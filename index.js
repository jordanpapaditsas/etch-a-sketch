// Initializing variables
const gridContainer = document.querySelector('#gridContainer');
const colorPicker = document.querySelector('#rbgPicker').value;
const clearAllBtn = document.querySelector('#clear');

// Creates a grid of 16 x 16
function createGrid() {
  for (let i = 0; i < 256; i++) {
    let gridCell = document.createElement('div');
    gridCell.classList.add('cell');
    gridContainer.appendChild(gridCell);
  };
};
createGrid();

// Selecting all cell elements
const gridCell = document.querySelectorAll('.cell');

// Traversing each cell and applying them a fillColor function 
gridCell.forEach((cell) => {
  cell.addEventListener('mousedown', () => {
    fillColor(cell)
  });
});

//  Adding color to the chosen cell
function fillColor(cell) {
  cell.style.backgroundColor = `${colorPicker}`;
}








// Clear all cells
clearAllBtn.addEventListener('click', clearAll);

function clearAll() {
  gridCell.forEach(cell => {
    cell.style.backgroundColor = 'white';
  });
};