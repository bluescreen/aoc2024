import { readInputForDay, readInputForDayExample, readInputForDayExampleRaw, readInputForDayRaw } from "../util";
import { zip } from "./util/zip";

function parseInput(input: string): { locks: string[][], keys: string[][] } {
  const blocks = input.trim().split("\n\n").map(block => block.split("\n"));
  return {
      locks: blocks.filter(b => b[0][0] === "#"),
      keys: blocks.filter(b => b[0][0] !== "#"),
  };
}

function isValidPair(lock: string[], key: string[]): boolean {
  for (let c = 0; c < lock[0].length; c++) {
      const columnLock = lock.map(row => row[c]);
      const columnKey = key.map(row => row[c]);
      if (zip(columnLock, columnKey).some(([l, k]) => l === "#" && k === "#")) {
          return false;
      }
  }
  return true;
}

function countValidPairs(locks: string[][], keys: string[][]): number {
  return locks.reduce((count, lock) =>
      count + keys.filter(key => isValidPair(lock, key)).length, 0);
}

export const part1 = (input: string) => {
  const { locks, keys } = parseInput(input);
  return countValidPairs(locks, keys); 
};

const DAY = Number("25")

export const main = async () => {
  const data = await readInputForDayRaw(DAY);
  console.log("Result part 1", part1(data));
};


