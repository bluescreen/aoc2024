import {  printGrid, readInputForDay, readInputForDayExample } from "../util";

type Point = { x: number; y: number };

type RegionInfo = {
  area: number;
  sides: number;
};

type FenceSet = Set<string>; // Stores fence positions as strings "x,y -> nx,ny"

  
  
function calculateTotalFencePrice(grid: string[][]): { totalPrice: number; fences: FenceSet } {
    const rows = grid.length;
    const cols = grid[0].length;
  
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const directions = [
      { dx: -1, dy: 0 }, // Up
      { dx: 1, dy: 0 }, // Down
      { dx: 0, dy: -1 }, // Left
      { dx: 0, dy: 1 }, // Right
    ];
  
    const isInBounds = (x: number, y: number): boolean => x >= 0 && x < rows && y >= 0 && y < cols;
  
    const fences: FenceSet = new Set();
  
    const addFence = (x1: number, y1: number, x2: number, y2: number) => {
      const sortedFence = [
        `${Math.min(x1, x2)},${Math.min(y1, y2)}`,
        `${Math.max(x1, x2)},${Math.max(y1, y2)}`
      ].join(' -> ');
      fences.add(sortedFence);
    };
  
    const floodFill = (start: Point): RegionInfo => {
      const queue: Point[] = [start];
      const regionType = grid[start.x][start.y];
      let area = 0;
      let sides = 0;
  
      while (queue.length > 0) {
        const { x, y } = queue.pop()!;
        if (visited[x][y]) continue;
  
        visited[x][y] = true;
        area++;
  
        // Check all 4 directions
        for (const { dx, dy } of directions) {
          const nx = x + dx;
          const ny = y + dy;
  
          if (!isInBounds(nx, ny) || grid[nx][ny] !== regionType) {
            // Out of bounds or bordering a different region
            sides++;
            if (isInBounds(nx, ny)) {
              addFence(x, y, nx, ny);
            }
          } else if (!visited[nx][ny]) {
            queue.push({ x: nx, y: ny });
          }
        }
      }
  
      return { area, sides };
    };
  
    const regions = new Map<string, RegionInfo>();
  
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (!visited[x][y]) {
          const regionType = grid[x][y];
          const { area, sides } = floodFill({ x, y });
  
          if (!regions.has(regionType)) {
            regions.set(regionType, { area: 0, sides: 0 });
          }
  
          const info = regions.get(regionType)!;
          info.area += area;
          info.sides += sides;
        }
      }
    }
  
    let totalPrice = 0;
    for (const { area, sides } of regions.values()) {
      totalPrice += area * sides;
    }
  
    return { totalPrice, fences };
  }

export const part1 = (input: string[]) => {
  //return calculateTotalFencePrice(input.map((row) => row.split("")));
};

export const part2 = (input: string[]) => {
    const grid = input.map((row) => row.split(""));
  const {fences, totalPrice} = calculateTotalFencePrice(grid);

  console.log(fences);
    printGrid(grid,"",fences,() => "#")
  return totalPrice;
};

const DAY = Number("12")

export const main = async () => {
  const data = await readInputForDayExample(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


