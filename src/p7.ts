import { readInputForDay, readInputForDayExample } from "../util";

type Equation = {
  target: number;
  numbers: number[];
};

function parseInput(input: string[]): Equation[] {
  return input
    .filter(line => line.trim())
    .map(line => {
      const [target, numbers] = line.split(":").map(part => part.trim());
      return {
        target: parseInt(target, 10),
        numbers: numbers.split(" ").map(Number),
      };
    });
}


function solveEquations(equations: Equation[], operators: string[]): number[] {
  const solutions: number[] = [];

  const evaluate = (numbers: number[], target: number, current: number, index: number, operators: string[]): boolean => {
    if (index === numbers.length - 1) {
      return current === target;
    }

    for (const op of operators) {
      const nextValue = numbers[index + 1];
      let newResult = current;
      
      if (op === "+") {
        newResult += nextValue;
      } else if (op === "*") {
        newResult *= nextValue;
      } else if (op === "||") {
        newResult = parseInt(current.toString() + nextValue.toString(), 10);
      }

      if (newResult > target) continue;

      if (evaluate(numbers, target, newResult, index + 1, operators)) {
        return true;
      }
    }
    return false;
  };

  for (const { target, numbers } of equations) {
    if (evaluate(numbers, target, numbers[0], 0, operators)) {
      solutions.push(target);
    }
  }

  return solutions;
}


export const part1 = (input: string[]) => {
  const equations = parseInput(input);
  return  solveEquations(equations, ["+", "*"]).reduce((a,b) => a+b);
};

export const part2 = (input: string[]) => {
 const equations = parseInput(input);
 return  solveEquations(equations, ["+", "*", "||"]).reduce((a,b) => a+b);
};

const DAY = Number("7")

export const main = async () => {
  const data = await readInputForDay(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};