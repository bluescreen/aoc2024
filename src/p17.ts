import { readInputForDay, readInputForDayExample, readInputForDayExampleRaw, readInputForDayRaw } from "../util";

function runProgram(A: number, B: number, C: number, program: number[]): string {
  const output: number[] = [];
  const resolve = (o: number) => [0, 1, 2, 3, A, B, C][o] ?? 0;

  for (let ip = 0; ip < program.length; ip += 2) {
      const [opcode, operand] = [program[ip], program[ip + 1]];
      switch (opcode) {
          case 0: A = Math.trunc(A / 2 ** resolve(operand)); break;
          case 1: B ^= operand; break;
          case 2: B = resolve(operand) % 8; break;
          case 3: if (A) { ip = operand - 2; } break;
          case 4: B ^= C; break;
          case 5: output.push(resolve(operand) % 8); break;
          case 6: B = Math.trunc(A / 2 ** resolve(operand)); break;
          case 7: C = Math.trunc(A / 2 ** resolve(operand)); break;
      }
  }
  return output.join(",");
}

function findLowestAForSelfOutput(program: number[]): number {
  const targetOutput = program.join(",");
  let A = 1;

  while (true) {
      const output = runProgram(A, 0, 0, program);
      if (output === targetOutput) return A;
      console.log(output,' / ', targetOutput,'->', A)
      A++;
  }
}

function reverseEngineerA(targetOutput: number[], program: number[]): number {
  let reconstructedA = 0;

  // Reconstruct the program's output sequence backwards
  for (let i = targetOutput.length - 1; i >= 0; i--) {
      // Multiply A by 8 (to reverse the modulo 8 operation)
      reconstructedA = reconstructedA * 8 + targetOutput[i];

      // Work backwards through the program (processing from the last instruction to the first)
      for (let ip = program.length - 2; ip >= 0; ip -= 2) {
          const opcode = program[ip];
          const operand = program[ip + 1];

          if (opcode === 5) {
              // Output is generated from A, so we check this step
              break;
          } else if (opcode === 0 || opcode === 6 || opcode === 7) {
              // Adv, bdv, and cdv divide A by some power of 2
              reconstructedA = reconstructedA * 2 ** operand;
          } else {
              // Other instructions are not affecting A directly
              continue;
          }
      }
  }

  return reconstructedA;
}




export const part1 = (input: string) => {
  const {registers, program } = parseInput(input)
  return runProgram(registers[0], registers[1], registers[2], program);;
};

export const part2 = (input: string) => {
  const { program } = parseInput(input)
  const targetOutput = program;
  console.log("target", targetOutput)

  const initialA = reverseEngineerA(targetOutput, program);
  return initialA;
};

const DAY = Number("17")

export const main = async () => {
  const data = await readInputForDayExampleRaw(DAY,2);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


function parseInput(input: string): { registers: number[]; program: number[] } {
  const registers = [0, 0, 0];
  const registerRegex = /Register ([ABC]): (\d+)/g;
  const programRegex = /Program:([\d,\s]+)/;

  input.match(registerRegex)?.forEach(match => {
      const [_, reg, val] = match.match(/([ABC]): (\d+)/)!;
      registers["ABC".indexOf(reg)] = +val;
  });

  const program = input.match(programRegex)?.[1]
      .split(",").map(n => +n.trim()) || [];

  return { registers, program };
}