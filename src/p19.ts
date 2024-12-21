import { readInputForDay, readInputForDayExample, readInputForDayExampleRaw, readInputForDayRaw } from "../util";

function canFormDesign(patterns: string[], design: string): boolean {
  const memo: Record<string, boolean> = {};

  const helper = (remaining: string): boolean => {
      if (!remaining) return true;
      if (remaining in memo) return memo[remaining];

      for (const pattern of patterns) {
          if (remaining.startsWith(pattern) && helper(remaining.slice(pattern.length))) {
              return (memo[remaining] = true);
          }
      }

      return (memo[remaining] = false);
  };

  return helper(design);
}

function countWaysToFormDesign(patterns: string[], design: string): number {
  const memo: Record<string, number> = {};

  const helper = (remaining: string): number => {
      if (!remaining) return 1;
      if (remaining in memo) return memo[remaining];

      let ways = 0;
      for (const pattern of patterns) {
          if (remaining.startsWith(pattern)) {
              ways += helper(remaining.slice(pattern.length));
          }
      }

      return (memo[remaining] = ways);
  };

  return helper(design);
}

function totalWaysToFormDesigns(patterns: string[], designs: string[]): number {
  return designs.reduce((total, design) => total + countWaysToFormDesign(patterns, design), 0);
}

function countPossibleDesigns(patterns: string[], designs: string[]): number {
  return designs.reduce((count, design) => count + (canFormDesign(patterns, design) ? 1 : 0), 0);
}

export const part1 = (input: string) => {
  const { patternList, designsList } = parseDesigns(input);
  return countPossibleDesigns(patternList,designsList);
};

export const part2 = (input: string) => {
  const { patternList, designsList } = parseDesigns(input);
  return totalWaysToFormDesigns(patternList,designsList);
};

const DAY = Number("19")

export const main = async () => {
  const data = await readInputForDayRaw(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


function parseDesigns(input: string) {
  const [patterns, designs] = input.split("\n\n");

  const patternList = patterns.split(", ");
  const designsList = designs.split("\n");
  return { patternList, designsList };
}

