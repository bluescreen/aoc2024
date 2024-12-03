import { readInputForDay, readInputForDayExample } from "../util";


export const part1 = (input: string[]) => {
  const fullString = input.join("");
  const regex = /mul\((\d+),(\d+)\)/gm;

  return  Array.from(fullString.matchAll(regex))
  .reduce((acc, match) => {
      const num1 = parseInt(match[1], 10);
      const num2 = parseInt(match[2], 10);
      return acc + num1 * num2;
  }, 0);
};

export const part2 = (input: string[]) => {
  const fullString = input.join("");
  const regex = /mul\((\d+),(\d+)\)|(do\([^)]*\)|don't\([^)]*\))/gm;
  let enabled = true;

  return Array.from(fullString.matchAll(regex)) 
  .reduce((acc, match) => {
      if (match[0] === "don't()") {
          enabled = false;
          return acc; 
      }
      if (match[0] === "do()") {
          enabled = true;
          return acc; 
      }

      if (enabled && match[1] && match[2]) {
          const num1 = parseInt(match[1], 10);
          const num2 = parseInt(match[2], 10);
          return acc + num1 * num2; 
      }

      return acc; 
  }, 0); 

};

const DAY = Number("3")

export const main = async () => {
  const data = await readInputForDay(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


