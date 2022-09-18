let grid;
let rows, cols;
let resolution = 10;

function make2dArray(rows, cols) {
    array = new Array(cols);
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(rows);
    }
    return array;
}

function countLiveNeighbors(grid, x, y) {
    let neighbors = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            let col = (i + cols) % cols;
            let row = (j + rows) % rows;

            if (!(col == x && row == y)) {
                neighbors += grid[col][row];
            }
        }
    }
    return neighbors;
}

function setup() {
    createCanvas(1900, 900);

    cols = width / resolution;
    rows = height / resolution;

    //make 2D array
    grid = make2dArray(rows, cols);

    //populate 2D array
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function draw() {
    background(0);

    //render the game
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 0) {
                fill(255);
                rect(x, y, resolution, resolution);
            }
        }
    }

    let newGen = make2dArray(rows, cols);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let neighbors = countLiveNeighbors(grid, i, j);

            if (grid[i][j] == 0 && neighbors == 3) {
                newGen[i][j] = 1;
            } else if (grid[i][j] == 1 && (neighbors < 2 || neighbors > 3)) {
                newGen[i][j] = 0;
            } else {
                newGen[i][j] = grid[i][j];
            }
        }
    }

    grid = newGen;
}
