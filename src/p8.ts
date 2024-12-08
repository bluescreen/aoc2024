import {  readInputForDay } from "../util";

type Grid = string[][];

function calculateSignalImpact(grid: Grid, part: number):  number {
  const antennas: Record<string, [number, number][]> = findAntennas( grid);
  const antinodes = calculateAntinodePositions(grid, antennas, part);
  return antinodes.size;
}

function calculateAntinodePositions(grid: Grid, antennas: Record<string, [number, number][]>, part: number) {
  const rows = grid.length;
  const cols = grid[0].length;
  const antinodes = new Set<string>();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const [_, positions] of Object.entries(antennas)) {
        for (const [r1, c1] of positions) {
          for (const [r2, c2] of positions) {
            if (r1 === r2 && c1 === c2) continue; 

            const distance1 = Math.abs(r - r1) + Math.abs(c - c1);
            const distance2 = Math.abs(r - r2) + Math.abs(c - c2);

            const dr1 = r - r1;
            const dc1 = c - c1;
            const dr2 = r - r2;
            const dc2 = c - c2;

            const collinear = dr1 * dc2 === dc1 * dr2;

            if (part == 1 && (distance1 === 2 * distance2 || distance1 * 2 === distance2) &&
              collinear &&
              inBounds(r,c,grid)
            ) {
              antinodes.add(`${r},${c}`);
            }

            if(part == 2 && inBounds(r,c,grid) && (dr1*dc2 == dc1*dr2)){
              antinodes.add(`${r},${c}`);
            }
          }
        }
      }
    }
  }
  return antinodes;
}

function findAntennas(grid: Grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const antennas: Record<string, [number, number][]> = {};

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c];
      if (cell !== '.') {
        if (!antennas[cell]) {
          antennas[cell] = [];
        }
        antennas[cell].push([r, c]);
      }
    }
  }
  return antennas;
}
 
const inBounds = (r: number, c: number,grid: Grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  return  r >= 0 &&
  c >= 0 &&
  r < rows &&
  c < cols
}

export const part1 = (input: string[]) => {
  return calculateSignalImpact(input.map((row) => row.split("")), 1);
};

export const part2 = (input: string[]) => {
  return calculateSignalImpact(input.map((row) => row.split("")), 2);
};

const DAY = Number("8")

export const main = async () => {
  const data = await readInputForDay(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};