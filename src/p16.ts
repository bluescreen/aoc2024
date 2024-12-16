import { printGrid, readInputForDay, readInputForDayExample } from "../util";

type Direction = "N" | "E" | "S" | "W";

interface State {
  x: number;
  y: number;
  direction: Direction;
  cost: number;
  path?: Set<string>
}

const DIRECTIONS: Direction[] = ["N", "E", "S", "W"];
const MOVES: Record<Direction, [number, number]> = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
};

const TURN_COST = 1001; 
const STEP_COST = 1;

function solveMaze(maze: string[]) {
  const rows = maze.length;
  const cols = maze[0].length;

  let { startX, startY, endX, endY } = findStartEnd(rows, cols, maze);

  const minHeap: State[] = [{ x: startX, y: startY, direction: "E", cost: 0 }];
  const visited = new Set<string>();

  const encodeState = (x: number, y: number, dir: Direction) => `${x},${y},${dir}`;

  while (minHeap.length > 0) {
    minHeap.sort((a, b) => a.cost - b.cost); 
    const { x, y, direction, cost } = minHeap.shift()!;

    if (x === endX && y === endY) {
      return {cost, visited};
    }

    const stateKey = encodeState(x, y, direction);
    if (visited.has(stateKey)) continue;
    visited.add(stateKey);

    for (const newDirection of DIRECTIONS) {
      const [dx, dy] = MOVES[newDirection];
      const nx = x + dx;
      const ny = y + dy;

      if (maze[nx][ny] === "#") continue;
      const turnCost = direction === newDirection ? 0 : TURN_COST;
      const newCost = cost + STEP_COST + turnCost;

      minHeap.push({ x: nx, y: ny, direction: newDirection, cost: newCost });
    }
  }

  return -1;
}

function findStartEnd(rows: number, cols: number, maze: string[]) {
  let startX = 0, startY = 0, endX = 0, endY = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (maze[r][c] === "S") {
        startX = r;
        startY = c;
      } else if (maze[r][c] === "E") {
        endX = r;
        endY = c;
      }
    }
  }
  return { startX, startY, endX, endY };
}

function findBestPathTiles(maze: string[]): Set<string> {
  const rows = maze.length;
  const cols = maze[0].length;

  // Parse maze and find start and end positions
  let startX = 0, startY = 0, endX = 0, endY = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (maze[r][c] === "S") {
        startX = r;
        startY = c;
      } else if (maze[r][c] === "E") {
        endX = r;
        endY = c;
      }
    }
  }

  // Priority queue for Dijkstra's Algorithm
  const pq: State[] = [{
    x: startX,
    y: startY,
    direction: "E",
    cost: 0,
    path: new Set<string>([`${startX},${startY}`]),
  }];
  const visited = new Map<string, number>(); // Track minimum cost for each state

  const encodeState = (x: number, y: number, dir: Direction) => `${x},${y},${dir}`;
  const encodeTile = (x: number, y: number) => `${x},${y}`;

  // To store all tiles in optimal paths
  const bestTiles = new Set<string>();

  let minCost = Infinity;

  while (pq.length > 0) {
    // Get the state with the lowest cost
    pq.sort((a, b) => a.cost - b.cost);
    const { x, y, direction, cost, path } = pq.shift()!;

    const stateKey = encodeState(x, y, direction);

    // If we've visited this state with a lower or equal cost, skip it
    if (visited.has(stateKey) && visited.get(stateKey)! <= cost) {
      continue;
    }
    visited.set(stateKey, cost);

    if (x === endX && y === endY) {
      console.log(path)


      if (cost < minCost) {

        minCost = cost;

      }

      if (cost === minCost) {
        path.forEach(tile => bestTiles.add(tile));

        continue;
      }
    }

    for (const newDirection of DIRECTIONS) {
      const [dx, dy] = MOVES[newDirection];
      const nx = x + dx;
      const ny = y + dy;

      if (maze[nx][ny] === "#") {
        continue;
      }

      const stepCost = STEP_COST;
      const turnCost = direction === newDirection ? 0 : TURN_COST;
      const newCost = cost + stepCost + turnCost;

      const newPath = new Set(path);
      newPath.add(encodeTile(nx, ny));

      pq.push({ x: nx, y: ny, direction: newDirection, cost: newCost, path: newPath });
    }
  }

  return bestTiles;
}



export const part1 = (input: string[]) => {  

  const grid = input.map((r) => r.split(""))
   const {visited, cost} = solveMaze(input);
  // printGrid(grid, "",visited);

  return cost
};

export const part2 = (input: string[]) => {
  const grid = input.map((r) => r.split(""))
  const bestTiles = findBestPathTiles(input);
  printGrid(grid, "",bestTiles, () => "O");

  return bestTiles.size 
};

const DAY = Number("16")

export const main = async () => {
  const data = await readInputForDayExample(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


