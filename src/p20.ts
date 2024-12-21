import { printGrid,  readInputForDayExample } from "../util";

type Point = { x: number; y: number };
type Cheat = { savings: number; start: Point; end: Point };

const directions = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
];

// Parse map to find start (S) and end (E)
function parseMap(map: string[]): { grid: string[][]; start: Point; end: Point } {
    const grid = map.map(row => row.split(""));
    let start: Point | null = null, end: Point | null = null;

    grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === "S") start = { x, y };
            if (cell === "E") end = { x, y };
        });
    });

    if (!start || !end) throw new Error("Invalid map: Missing S or E");
    return { grid, start, end };
}

// Precompute distances from the end to all points
function computeDistances(grid: string[][], end: Point): Map<string, number> {
    const distances = new Map<string, number>();
    const queue: [Point, number][] = [[end, 0]];
    const visited = new Set<string>();

    while (queue.length) {
        const [{ x, y }, dist] = queue.shift()!;
        const key = `${x},${y}`;
        if (visited.has(key)) continue;
        visited.add(key);
        distances.set(key, dist);

        for (const { x: dx, y: dy } of directions) {
            const nx = x + dx, ny = y + dy;
            if (
                nx >= 0 && ny >= 0 && ny < grid.length && nx < grid[ny].length &&
                grid[ny][nx] !== "#" && !visited.has(`${nx},${ny}`)
            ) {
                queue.push([{ x: nx, y: ny }, dist + 1]);
            }
        }
    }

    return distances;
}

// BFS with cheat logic
function findCheats(grid: string[][], start: Point, end: Point, distances: Map<string, number>, d0: number, cheatTime: number): number {
    const queue: [number, Point, Point | null, Point | null, number | null][] = [[0, start, null, null, null]];
    const seen = new Set<string>();
    const cheats = new Set<string>();
    const SAVE = 100;

    while (queue.length) {
        let [steps, { x, y }, cheatStart, cheatEnd, remainingCheatTime] = queue.shift()!;
        const key = `${x},${y},${cheatStart ? `${cheatStart.x},${cheatStart.y}` : "null"},${cheatEnd ? `${cheatEnd.x},${cheatEnd.y}` : "null"},${remainingCheatTime}`;
        if (seen.has(key)) continue;
        seen.add(key);

        if (steps >= d0 - SAVE) continue;

        if (x === end.x && y === end.y) {
            if (!cheatEnd) cheatEnd = { x, y };
            cheats.add(`${cheatStart?.x},${cheatStart?.y}-${cheatEnd.x},${cheatEnd.y}`);
            continue;
        }

        for (const { x: dx, y: dy } of directions) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || ny < 0 || ny >= grid.length || nx >= grid[ny].length) continue;

            if (remainingCheatTime !== null) {
                // Using a cheat
                queue.push([steps + 1, { x: nx, y: ny }, cheatStart, cheatEnd, remainingCheatTime - 1]);
            } else if (grid[ny][nx] !== "#") {
                // Normal movement
                queue.push([steps + 1, { x: nx, y: ny }, cheatStart, cheatEnd, null]);
            } else if (!cheatStart) {
                // Start a new cheat
                queue.push([steps + 1, { x: nx, y: ny }, { x, y }, null, cheatTime - 1]);
            }
        }
    }

    return cheats.size;
}

// Main function
function analyzeCheatsWithThreshold(map: string[], cheatTime: number, threshold: number): number {
    const { grid, start, end } = parseMap(map);
    const distances = computeDistances(grid, end);
    const d0 = distances.get(`${start.x},${start.y}`)!;
    const totalCheats = findCheats(grid, start, end, distances, d0, cheatTime);
    return totalCheats;
}


export const part1 = (input: string[], ) => {

  const threshold = 100;
  const cheatTime = 2;
  const result = analyzeCheatsWithThreshold(input, cheatTime, threshold);
  console.log(`Cheats saving at least ${threshold} picoseconds: ${result}`);
};

export const part2 = (input: string[]) => {
 return 0; 
};

const DAY = Number("20")

export const main = async () => {
  const data = await readInputForDayExample(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


