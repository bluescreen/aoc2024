import { readInputForDayRaw } from "../util";

function evolveStones(stones: number[], blinks: number): number {
  let stoneCounts = new Map<number, number>();

  stones.forEach(stone => 
      stoneCounts.set(stone, (stoneCounts.get(stone) || 0) + 1)
  );

  for (let i = 0; i < blinks; i++) {
      const nextCounts = new Map<number, number>();

      stoneCounts.forEach((count, stone) => {
          if (stone === 0) {
              nextCounts.set(1, (nextCounts.get(1) || 0) + count);
          } else if (stone.toString().length % 2 === 0) {
              const str = stone.toString();
              const [left, right] = [
                  parseInt(str.slice(0, str.length / 2)),
                  parseInt(str.slice(str.length / 2))
              ];
              nextCounts.set(left, (nextCounts.get(left) || 0) + count);
              nextCounts.set(right, (nextCounts.get(right) || 0) + count);
          } else {
              const transformed = stone * 2024;
              nextCounts.set(transformed, (nextCounts.get(transformed) || 0) + count);
          }
      });

      stoneCounts = nextCounts;
  }

  return Array.from(stoneCounts.values()).reduce((a, b) => a + b, 0);
}

export const part1 = (input: string) => {
  return evolveStones(input.split(" ").map(Number),25);
};

export const part2 = (input: string) => {
  return evolveStones(input.split(" ").map(Number),75);
};

const DAY = Number("11")

export const main = async () => {
  const data = await readInputForDayRaw(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


