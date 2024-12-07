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

function generateOperatorCombinations(length: number, operators: string[]): string[][] {
  const results: string[][] = [];
  const generate = (current: string[]) => {
    if (current.length === length) {
      results.push([...current]);
      return;
    }
    operators.forEach(op => generate([...current, op]));
  };
  generate([]);
  return results;
}

function evaluateExpression(numbers: number[], operators: string[]): number {
  return operators.reduce((result, op, i) => {
    const next = numbers[i + 1];
    return op === "+" ? result + next
         : op === "*" ? result * next
         : parseInt(result.toString() + next.toString(), 10);
  }, numbers[0]);
}

function solveEquations(equations: Equation[], operators: string[]): number[] {
  return equations
    .map(({ target, numbers }) => {
      const operatorCombinations = generateOperatorCombinations(numbers.length - 1, operators);
      return operatorCombinations.some(combination => evaluateExpression(numbers, combination) === target)
        ? target
        : null;
    })
    .filter(Boolean) as number[]; 
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


