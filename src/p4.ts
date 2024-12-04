import { readInputForDay, readInputForDayExample } from "../util";

type Grid = string[];
type Direction = { dx: number; dy: number };

const directions: Direction[] = [
  { dx: 1, dy: 0 },   // right
  { dx: -1, dy: 0 },  // left
  { dx: 0, dy: 1 },   // bottom
  { dx: 0, dy: -1 },  // top
  { dx: -1, dy: 1 },  // bottom-left
  { dx: 1, dy: 1 },   // bottom-right
  { dx: -1, dy: -1 }, // top-left
  { dx: 1, dy: -1 },  // top-right
];

const findWordInAllDirections = (grid: Grid, word: string): number => {
  let count = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      for (const direction of directions) {
        if (findWordInDirection(grid, x, y, word, direction)) {
          count++;
        }
      }
    }
  }

  return count;
};

const findWordInDirection = (grid: string[], x: number, y: number, word: string, dir: Direction): boolean => {
  for (let i = 0; i < word.length; i++) {
    const nextX = x + i * dir.dx;
    const nextY = y + i * dir.dy;

    if (nextX < 0 || nextY < 0 || nextX >= grid[0].length || nextY >= grid.length) {
      return false;
    }
    if (grid[nextY][nextX] !== word[i]) {
      return false;
    }
  }
  return true;
};

function findCrossMAS(grid: Grid):number {
  const rows = grid.length;
  const cols = grid[0].length;

  let count = 0;
  for (let x = 1; x < rows - 1; x++) {
    for (let y = 1; y < cols - 1; y++) {
      if (grid[x][y] === "A") {
        const forward = (grid[x - 1][y - 1] === "M" && grid[x + 1][y + 1] === "S") ||
          (grid[x - 1][y - 1] === "S" && grid[x + 1][y + 1] === "M");
        const backward = (grid[x - 1][y + 1] === "M" && grid[x + 1][y - 1] === "S") ||
          (grid[x - 1][y + 1] === "S" && grid[x + 1][y - 1] === "M");
        if (forward && backward) count++;
      }
    }
  }
  return count;
}



export const part1 = (input: string[]) => {
  const grid: Grid = makeGrid(input);
  return findWordInAllDirections(grid, "XMAS");
};

export const part2 = (input: string[]) => {
  const grid: Grid = makeGrid(input);
  return findCrossMAS(grid);
};

const DAY = Number("4")

export const main = async () => {
  const data = await readInputForDay(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


function makeGrid(input: string[]): Grid {
  const grid: Grid = [];
  for (const line of input) {
    grid.push(line);
  }
  return grid;
}

