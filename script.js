const DEFAULT_SQUARE_NUM = 16;
drawGrid(DEFAULT_SQUARE_NUM);

const newSizeButton = document.querySelector('#new-size');
newSizeButton.addEventListener('click', () =>{
    let newSize = prompt('Enter new grid size from 16 to 100: ');

    if(newSize > 100 || newSize < DEFAULT_SQUARE_NUM) {
        newSize = prompt('Enter valid number: ');
    }

    localStorage.setItem('size', newSize);

    clearGrid();

    drawGrid(newSize);
})

const resetGridButton = document.querySelector('#reset');
resetGridButton.addEventListener('click', resetGrid)

function resetGrid() {
    let oldSize = localStorage.getItem('size');

    if(oldSize === undefined || oldSize < DEFAULT_SQUARE_NUM) {
        oldSize = DEFAULT_SQUARE_NUM;
    }

    clearGrid();

    drawGrid(oldSize);
}

function clearGrid() {
    const grid = document.querySelector('.grid');
    grid.remove();
}

function drawGrid(size) {
    const container = document.querySelector('.container');

    const grid = document.createElement('div');
    grid.classList.add('grid');

    for (let row = 0; row < size; row++) {
        const row = document.createElement('div');
        row.classList.add('row');
        row.style.cssText = `height: calc(100%/${size});`;
        for (let i = 0; i < size; i++) {
            drawSquare(size, row);
        }
        grid.appendChild(row);
    }

    container.appendChild(grid);
}

function drawSquare(size, row) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.cssText = `width: calc(100%/${size}); opacity: 0.1;`;

    square.addEventListener('mouseover', () => {
        square.style.backgroundColor = random_rgba();

        let opacityValue = Number(window.getComputedStyle(square).opacity);

        if(opacityValue < 1) {
            opacityValue += 0.1;
            square.style.opacity = `${opacityValue}`;
        }
    })

    row.appendChild(square);
}


function random_rgba() {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}


