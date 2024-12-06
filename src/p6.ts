import { printGrid, readInputForDay,  } from "../util";
import { StringMap } from "./util/stringmap";

type Direction = "up" | "down" | "left" | "right";

interface Position {
  x: number;
  y: number;
  direction: Direction;
}

const directions: Record<Direction, [number, number]> = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

export const part1 = (input: string[]) => {
  return countDistinctPositions(input);
};

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
const map: string[][] = [];

const init = (input: string[], xStart: number, yStart: number) => {
  for (const row of input) {
    map.push(row.split(''));
    if (row.indexOf('^') >= 0) {
      [xStart, yStart] = [row.indexOf('^'), map.length - 1];
      map[yStart][xStart] = '.';
    }
  }
};

const part = 2;


const explore = (xI: number, yI:number, dir = 0, placeObstruction = false) => {
  const visited: Map<number[], Set<number>> = new  StringMap();
  let [x, y] = [xI, yI];
  let [dx, dy] = dirs[dir];
  let [xO, yO] = [0, 0];
  let loopCount = 0;

  while (map[y]?.[x] && !visited.get([x, y])?.has(dir)) {
    visited.has([x, y]) ? visited.get([x, y]).add(dir) : visited.set([x, y], new Set([dir]));
    [xO, yO] = [x + dx, y + dy];
    if (placeObstruction && map[yO]?.[xO] === '.' && !visited.has([xO, yO])) {
      map[yO][xO] = '#';
      loopCount += explore(x, y, dir);
      map[yO][xO] = '.';
    }
    if (map[yO]?.[xO] === '#') {
      dir = (dir + 1) % 4;
      [dx, dy] = dirs[dir];
    } else {
      [x, y] = [xO, yO];
    }
  }

  if (!placeObstruction && map[y]?.[x]) {
    loopCount = 1;
  }
  return loopCount;
};

export const part2 = (input: string[]) => {
  const player = findPlayer(input);
  init(input, player?.x, player?.y);
  return explore(player.x, player.y, 0, true)
};

const DAY = Number("6")

export const main = async () => {
  const data = await readInputForDay(DAY);
  //console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

const turnRight = (current: Direction): Direction => {
  const order: Direction[] = ["up", "right", "down", "left"];
  const index = (order.indexOf(current) + 1) % order.length;
  return order[index];
};

function countDistinctPositions(grid: string[]): number {
  const player = findPlayer(grid);
  if(!player) throw new Error("Player not found")

  const isValid = (x: number, y: number): boolean =>
    y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
  
  const visited = new Set<string>();
  const visitedObst = new Set<string>();

  visited.add(`${player.y},${player.x}`);

  let found = 0;
  let nextX, nextY

   for (let o_y = 0; o_y < grid.length; o_y++) {
     for (let o_x = 0; o_x < grid[o_y].length; o_x++) {
      console.log("try", o_y, o_x)

      while (true) {
        const [dy, dx] = directions[player.direction];
        nextX = player.x + dx;
        nextY = player.y + dy;

            if (!isValid(nextX, nextY)) {
              return visited.size;
            }
              if(visitedObst.has(`${player.y},${player.x},${player.direction}`)){
                found++;
                break;
              }

              player.x = nextX;
              player.y = nextY;

              visited.add(`${player.y},${player.x}`);
              visitedObst.add(`${player.y},${player.x},${player.direction}`);

              if(grid[nextY][nextX] == "#"){
                player.direction = turnRight(player.direction);
              }
            }
      //   }
      // }

      

     
      
    }
  }

  console.log(found);

  printGrid(grid, "Test", visited, () => "X")

  return visited.size;
}
function findPlayer(grid: string[]): Position|null {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if ("^v<>".includes(grid[y][x])) {

        if (grid[y][x] === "^") {
          return { x, y, direction: "up" };
        }
        break;
      }
    }
  }
  return null;
}

