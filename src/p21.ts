import { readInputForDay, readInputForDayExample } from "../util";

type Position = [number, number];

// Keypad layouts
const numericKeys: Record<string, Position> = {
    "7": [0, 0],
    "8": [0, 1],
    "9": [0, 2],
    "4": [1, 0],
    "5": [1, 1],
    "6": [1, 2],
    "1": [2, 0],
    "2": [2, 1],
    "3": [2, 2],
    "0": [3, 1],
    "A": [3, 2],
};

const directionKeys: Record<string, Position> = {
    "^": [0, 1],
    "A": [0, 2],
    "<": [1, 0],
    "v": [1, 1],
    ">": [1, 2],
};

// Direction deltas
const dd: Record<string, Position> = {
    ">": [0, 1],
    "v": [1, 0],
    "<": [0, -1],
    "^": [-1, 0],
};

// Find the shortest path between two points on a keypad
function findShortestPath(
  start: Position,
  target: Position,
  keypad: Record<string, Position>
): string {
  const queue: { position: Position; path: string }[] = [];
  const visited = new Set<string>();

  queue.push({ position: start, path: "" });
  visited.add(start.toString());

  while (queue.length > 0) {
      const { position: [x, y], path } = queue.shift()!;

      if (x === target[0] && y === target[1]) {
          console.log(`Path found from ${start} to ${target}: ${path}A`);
          return path + "A"; // Append "A" for activation
      }

      for (const [dir, [dx, dy]] of Object.entries(dd)) {
          const nx = x + dx, ny = y + dy;
          if (Object.values(keypad).some(([kx, ky]) => kx === nx && ky === ny) && !visited.has([nx, ny].toString())) {
              queue.push({ position: [nx, ny], path: path + dir });
              visited.add([nx, ny].toString());
          }
      }
  }

  throw new Error(`Path not found from ${start} to ${target}`);
}

// Precompute shortest paths between all keys on a keypad
function precomputePaths(keypad: Record<string, Position>): Record<string, Record<string, string>> {
    const shortestPaths: Record<string, Record<string, string>> = {};
    for (const [key1, pos1] of Object.entries(keypad)) {
        shortestPaths[key1] = {};
        for (const [key2, pos2] of Object.entries(keypad)) {
            shortestPaths[key1][key2] = findShortestPath(pos1, pos2, keypad);
        }
    }
    return shortestPaths;
}

// Memoized pathfinding
const numericPaths = precomputePaths(numericKeys);
const directionalPaths = precomputePaths(directionKeys);

// Calculate the shortest sequence for typing a code
function shortestSequence(code: string): number {
    let length = 0;

    // Numeric keypad: Type the code
    let currentKey = "A";
    for (const digit of code) {
        console.log(`Numeric Keypad: Moving from ${currentKey} to ${digit}`);
        length += numericPaths[currentKey][digit].length;
        console.log(`Sequence: ${numericPaths[currentKey][digit]}`);
        currentKey = digit;
    }

    // Directional keypad (first robot): Type the numeric sequence
    let currentDirectionalKey = "A";
    let numericSequence = numericPaths["A"][code[0]];
    for (const char of numericSequence) {
        console.log(`First Directional Keypad: Moving from ${currentDirectionalKey} to ${char}`);
        length += directionalPaths[currentDirectionalKey][char].length;
        console.log(`Sequence: ${directionalPaths[currentDirectionalKey][char]}`);
        currentDirectionalKey = char;
    }

    // Directional keypad (second robot): Type the first directional sequence
    let currentSecondKey = "A";
    let firstDirectionalSequence = directionalPaths["A"][numericSequence[0]];
    for (const char of firstDirectionalSequence) {
        console.log(`Second Directional Keypad: Moving from ${currentSecondKey} to ${char}`);
        length += directionalPaths[currentSecondKey][char].length;
        console.log(`Sequence: ${directionalPaths[currentSecondKey][char]}`);
        currentSecondKey = char;
    }

    return length;
}

// Main calculation
function calculateComplexity(codes: string[]): number {
    let totalComplexity = 0;

    for (const code of codes) {
        const numericValue = parseInt(code.slice(0, -1), 10); // Numeric part of the code
        const sequenceLength = shortestSequence(code);
        console.log(`Code: ${code}, Sequence Length: ${sequenceLength}, Numeric Value: ${numericValue}`);
        totalComplexity += sequenceLength * numericValue;
    }

    return totalComplexity;
}

export const part1 = (input: string[]) => {
  return calculateComplexity(input);
};

export const part2 = (input: string[]) => {
 return 0; 
};

const DAY = Number("21")

export const main = async () => {
  const data = await readInputForDayExample(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


