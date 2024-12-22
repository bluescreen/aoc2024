import { printGrid, printGridCompact, readInputForDay, readInputForDayExample } from "../util";

type Robot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const time = 100;

const calculateSafetyFactor = (robots: Robot[], width: number, height: number): number => {
  for (let t = 0; t < time; t++) {
    robots.forEach((robot) => {
      robot.x = (robot.x + robot.vx + width) % width;
      robot.y = (robot.y + robot.vy + height) % height;
    });
  }

  const middleX = Math.floor(width / 2);
  const middleY = Math.floor(height / 2);
  const quadrants = [0, 0, 0, 0]; 

  robots.forEach(({ x, y }) => {
    if (x === middleX || y === middleY) return; 
    if (x > middleX && y < middleY) quadrants[0]++; 
    else if (x < middleX && y < middleY) quadrants[1]++; 
    else if (x < middleX && y > middleY) quadrants[2]++; 
    else if (x > middleX && y > middleY) quadrants[3]++; 
  });

  return quadrants.reduce((product, count) => product * count, 1);
};

const createGrid = (robots: Robot[]): string[] => {
  const grid = Array.from({ length: height }, () => ".".repeat(width).split(""));
  robots.forEach(({ x, y }) => {
    grid[y][x] = grid[y][x] === "." ? "1" : (parseInt(grid[y][x], 10) + 1).toString();
  });
  return grid.map((row) => row.join(""));
};

const hasUniquePositions = (robots: Robot[]): boolean => {
  const seen = new Set<string>();
  for (const { x, y } of robots) {
    const key = `${x},${y}`;
    if (seen.has(key)) return false;
    seen.add(key);
  }
  return true;
};

const findTheEasterEgg = (robots: Robot[], width: number, height: number) => {

  let seconds = 1;
  while (true) {
    robots.forEach((robot) => {
      robot.x = (robot.x + robot.vx + width) % width;
      robot.y = (robot.y + robot.vy + height) % height;
    });

    if (hasUniquePositions(robots)) {
      // printRobots(robots);
      return seconds;
    }
    seconds++;
  }
  
}

const width = 101;
const height = 103;

export const part1 = (input: string[], width: number, height: number) => {
  
  const robots: Robot[] = parseRobots(input);
  return calculateSafetyFactor(robots,width, height);
};

export const part2 = (input: string[]) => {
  const robots: Robot[] = parseRobots(input);
  return findTheEasterEgg(robots, width, height); 
};

const DAY = Number("14")

export const main = async () => {
  const data = await readInputForDay(DAY);
  console.log("Result part 1", part1(data, width, height));
  console.log("Result part 2", part2(data));
};


function printRobots(robots: Robot[]) {
  console.clear();
  const grid = createGrid(robots);
  console.log(grid.join("\n"));
}

function parseRobots(input: string[]): Robot[] {
  return input.map((line) => {
    const [position, velocity] = line.split(" ");
    const [px, py] = position.slice(2).split(",").map(Number);
    const [vx, vy] = velocity.slice(2).split(",").map(Number);
    return { x: px, y: py, vx, vy };
  });
}

