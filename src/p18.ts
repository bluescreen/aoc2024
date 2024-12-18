import {  printGridCompact, readInputForDay, readInputForDayExample } from "../util";

function solveMaze(maze: string[]): { path: Set<string>, cost: number } {
  const rows = maze.length, cols = maze[0].length;
  const end = `${cols - 1},${rows - 1}`;
  const minHeap: { x: number; y: number; cost: number; parent: string | null }[] = [{ x: 0, y: 0, cost: 0, parent: null }];
  const visited = new Set<string>(), parents: Record<string, string | null> = {};

  const encode = (x: number, y: number) => `${x},${y}`;

  while (minHeap.length) {
    minHeap.sort((a, b) => a.cost - b.cost);
    const { x, y, cost, parent } = minHeap.shift()!;
    const state = encode(x, y);

    if (visited.has(state)) continue;
    visited.add(state);
    parents[state] = parent;

    if (state === end) {
      const path: string[] = [];
      for (let cur = state; cur; cur = parents[cur] as string) path.push(cur);
      return { cost, path: new Set(path.reverse()) };
    }

    for (const [dx, dy] of [[0, -1], [0, 1], [1, 0], [-1, 0]]) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx >= 0 && ny >= 0 && ny < rows && nx < cols && maze[ny][nx] !== "#") {
        minHeap.push({ x: nx, y: ny, cost: cost + 1, parent: state });
      }
    }
  }

  return { cost: -1, path: new Set() };
}

function makeGridFromCoords(coords: number[][], gridSize: number, maxBytes: number): string[] {
  const grid: string[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill('.'));
  for (const [x, y] of coords.slice(0, maxBytes)) {
    grid[y][x] = '#';
  }
  return grid.map((row)  => row.join(""));
}



export const part1 = (input: string[]) => {
  const coords = input.map((row) => row.split(",").map(Number));
  const grid = makeGridFromCoords(coords, 71, 1024);
  const {cost}  =  solveMaze(grid);
  return cost;
};

export const part2 = (input: string[]) => {
  const coords = input.map((row) => row.split(",").map(Number));
  let nextCost = 0;
  let byte = 0;

  while(true){
    const grid = makeGridFromCoords(coords, 71, byte);
    const {cost}  =  solveMaze(grid);
    nextCost = cost;

    if(nextCost === -1){
      return coords[byte-1];
    }
    byte++;
  }

};

const DAY = Number("18")

export const main = async () => {
  const data = await readInputForDay(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};



