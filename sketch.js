
let grid;
let oldGrid

let resolution = 10

let columns
let rows

function setup() {

  createCanvas(windowWidth, windowHeight);

  columns = round(width / resolution)
  rows = round(height / resolution)

  grid = make2DArray(columns,rows);
  for( let i = 0; i < columns; i++) {
    for( let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function make2DArray(columns, rows) {
  let array = new Array(columns);
  for( let i = 0; i < columns; i++) {
    array[i] = new Array(rows);
  }
  return array;
}

function draw() {
  background(18);

  for( let i = 0; i < columns; i++) {
    for( let j = 0; j < rows; j++) {
      if (grid[i][j] == 1) {
        let isAlive = grid[i][j]
        let x = i * resolution
        let y = j * resolution
        if (oldGrid != null) {
          if (isAlive == oldGrid[i][j]) {
            fill(color(0, 180, 0))
          } else {
            fill(255)
          }
        } else {
          fill(255)
        }
        circle(x,y, resolution)
      }
    }
  }

  let next = make2DArray(columns,rows);

  for( let i = 0; i < columns; i++) {
    for( let j = 0; j < rows; j++) {
      let isAlive = grid[i][j];
      if (i == 0 || i == columns -1 || j == 0 || j == rows -1) { 
        next[i][j] = isAlive;
       } else {
        let neighbors = countAliveNeighbors(grid, i , j);
        if (isAlive == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (isAlive == 1 && ( 2 > neighbors || neighbors  > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = isAlive;
        }
      }
    }
  }
  
  oldGrid = grid;
  grid = next;
}

function countAliveNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (!(i == 0 && j == 0 )) {
        sum += grid[x + i][y + j];
      }
    }
  }
  return sum;
}
