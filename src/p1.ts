import { readInputForDay, readInputForDayExample } from "../util";

const zip = (a:number[], b: number[]) => a.map((k, i) => [k, b[i]]);


export const part1 = (input: string[]) => {
  const { left, right } = parse(input);
  left.sort();
  right.sort();

  return zip(left, right).map(([l, r]) => Math.abs(l - r)).reduce((acc, a) => acc+a, 0);
};

export const part2 = (input: string[]) => {
  const { left, right } = parse(input);


  const counts: Record<number, number> = {};
  for (const n of right) {
      counts[n] = (counts[n] ?? 0) + 1;
  }

  return left.map(num => num * (counts[num] ?? 0))
    .reduce((acc, a) => acc+a);
};



export const main = async () => {
  const data = await readInputForDayExample(1);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


function parse(input: string[]):  { left: number[]; right: number[]; } {
  const left: number[] = [];
  const right: number[] = [];

  for (const line of input) {
    const [l, r] = line.trim().split(/\s+/).map(Number);
    left.push(l);
    right.push(r);
  }
  return { left, right };
}

