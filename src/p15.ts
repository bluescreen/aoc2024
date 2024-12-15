import {  printGrid, printGridCompact, readInputForDayExampleRaw, readInputForDayRaw } from "../util";
import readline from "readline";

type Position = { x: number, y: number };

const directions: Record<string, Position> = {
    '^': { x: 0, y: -1 },
    '>': { x: 1, y: 0 },
    'v': { x: 0, y: 1 },
    '<': { x: -1, y: 0 },
};

const waitForInput = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  await new Promise(resolve => rl.question("", () => {
    rl.close();
    resolve(undefined);
  }));
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const simulatePart1 = async (grid: string[][], instructions: string[]) => {
  const cols = grid[0].length, height = grid.length;

  const moveBox = (position: Position, direction: Position): boolean => {
      const next = { x: position.x + direction.x, y: position.y + direction.y };
  
      if (grid[next.y][next.x] === '.') {
          let temp = grid[position.y][position.x];
          grid[position.y][position.x] = grid[next.y][next.x];
          grid[next.y][next.x] = temp;
          return true;
      } else if (grid[next.y][next.x] === '#') {
          return false;
      } else {
          if (moveBox(next, direction)) {
              let temp = grid[position.y][position.x];
              grid[position.y][position.x] = grid[next.y][next.x];
              grid[next.y][next.x] = temp;
              return true;
          }
      }

      return false;
  }

  let robot = { x: 0, y: 0 };
  for (let y = 0; y < height; y++) {
      for (let x = 0; x < cols; x++) {
          if (grid[y][x] === '@') {
              robot = { x, y };
              grid[y][x] = '.';
          }
      }
  }

  let movesDone = "";
    for (const move of instructions) {
        const direction = directions[move];

        const position = { x: robot.x + direction.x, y: robot.y + direction.y };

        if (grid[position.y][position.x] !== '#') {
            if (grid[position.y][position.x] === '.') robot = position;

            if (grid[position.y][position.x] === 'O' && moveBox(position, direction)) robot = position;
        }

        const set = new Set<string>();
        set.add(`${robot.y},${robot.x}`);

        console.clear();

        printGridCompact(grid, move, set, () => '@');
        movesDone += move
        if(movesDone.length % 60 === 0) movesDone += "\n"
        console.log(movesDone);


        await sleep(50)

    }


    let score = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y][x] === 'O') score += y * 100 + x;
        }
    }

    return score;
};

export const part1 = (input: string) => {
  const [inputGrid, inputMoves] = input.split("\n\n");
  const grid = inputGrid.split("\n").map((row) => row.split(""));
  const moves = inputMoves.replaceAll("\n","").split("");
  console.log(moves);

   return simulatePart1(grid,moves);
};

export const part2 = (input: string[]) => {
 return 0; 
};

const DAY = Number("15")

export const main = async () => {
  const data = await readInputForDayExampleRaw(DAY,2);
  console.log("Result part 1", await part1(data));
  //console.log("Result part 2", part2(data));
};


