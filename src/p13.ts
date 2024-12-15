import { readInputForDayRaw } from "../util";

interface Button {
  x: number; 
  y: number; 
  cost: number; 
}

interface ClawMachine {
  buttonA: Button;
  buttonB: Button;
  prizeX: number;
  prizeY: number;
}

function parseClawMachine(text: string, modifier = 0): ClawMachine {
  const buttonAPattern = /Button A: X\+(\d+), Y\+(\d+)/;
  const buttonBPattern = /Button B: X\+(\d+), Y\+(\d+)/;
  const prizePattern = /Prize: X=(\d+), Y=(\d+)/;

  const buttonAMatch = text.match(buttonAPattern);
  const buttonBMatch = text.match(buttonBPattern);
  const prizeMatch = text.match(prizePattern);

  if (!buttonAMatch || !buttonBMatch || !prizeMatch) {
    throw new Error("Invalid format");
  }

  return {
    buttonA: { x: Number(buttonAMatch[1]), y: Number(buttonAMatch[2]), cost: 3 },
    buttonB: { x: Number(buttonBMatch[1]), y: Number(buttonBMatch[2]), cost: 1 },
    prizeX: parseInt(prizeMatch[1]) + modifier,
    prizeY: parseInt(prizeMatch[2]) + modifier,
  };
}


function solveClawMachinesEquation(machines: ClawMachine[]): number {
  let count = 0;
  for (let machine of machines) {
      const x1 = machine.buttonA.x;
      const y1 = machine.buttonA.y;
      const x2 = machine.buttonB.x;
      const y2 = machine.buttonB.y;
      const x3 = machine.prizeX;
      const y3 = machine.prizeY;

      const a = (x3 * (x2 - y2) - x2 * (x3 - y3)) / (x1 * (x2 - y2) + x2 * (y1 - x1));
      const b = (x3 - x1 * a) / x2;
      
      if (a === Math.floor(a) && b === Math.floor(b)){ 
        count += a * machine.buttonA.cost + b * machine.buttonB.cost;
      };
  }
  return count;
}

export const part1 = (input: string) => {
  const machines: ClawMachine[] = input.split("\n\n").map((text) => parseClawMachine(text));
  return solveClawMachinesEquation(machines); 
};

export const part2 = (input: string) => {
  const machines: ClawMachine[] = input.split("\n\n").map((text) => parseClawMachine(text, 10000000000000));
  return solveClawMachinesEquation(machines);
};

const DAY = Number("13")

export const main = async () => {
  const data = await readInputForDayRaw(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


