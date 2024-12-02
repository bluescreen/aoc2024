import { readInputForDay, readInputForDayExample } from "../util";


const deltas = (levels: number[]): number[] => {
  return levels.slice(1).map((level, index) => level - levels[index]);
};

function isSafe(levels: number[]): boolean {
  const d = deltas(levels);

  return (
    d.every(delta => [1, 2, 3].includes(delta)) ||
    d.every(delta => [-1, -2, -3].includes(delta))
  );
}

function canMakeSafe(levels: number[]): boolean {
  return levels.some((_, i) => isSafe(levels.filter((_, j) => j !== i)));
}


export const part1 = (input: string[]) => {
  const numbers =  input.map((line) => line.split(/\s+/).map(Number));
  return numbers.filter((n) =>  isSafe(n)).length;
};

export const part2 = (input: string[]) => {
  const numbers =  input.map((line) => line.split(/\s+/).map(Number));
  return numbers.filter((n) =>  isSafe(n) || canMakeSafe(n)).length;
};

const DAY = Number("2")

export const main = async () => {
  const data = await readInputForDay(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


