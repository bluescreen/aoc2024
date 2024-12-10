import { readInputForDay, readInputForDayExample } from "../util";


function calculateTrailheadScores(map: number[][]): number {
  const rows = map.length;
  const cols = map[0].length;

  function bfsFindNines(startX: number, startY: number): number {
      const visited = new Set<string>();
      const queue: [number, number][] = [[startX, startY]];
      const reachableNines = new Set<string>();

      while (queue.length > 0) {
          const [x, y] = queue.shift()!;
          const key = `${x},${y}`;
          if (visited.has(key)) continue;
          visited.add(key);
          const currentHeight = map[x][y];

          if (currentHeight === 9) {
              reachableNines.add(key);
              continue;
          }

          const directions = [
              [-1, 0], [1, 0], [0, -1], [0, 1]
          ];
          for (const [dx, dy] of directions) {
              const nx = x + dx;
              const ny = y + dy;
              if (
                  nx >= 0 && nx < rows &&
                  ny >= 0 && ny < cols &&
                  !visited.has(`${nx},${ny}`) &&
                  map[nx][ny] === currentHeight + 1
              ) {
                  queue.push([nx, ny]);
              }
          }
      }

      return reachableNines.size;
  }

  let totalScore = 0;

  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
          if (map[i][j] === 0) { 
              const score = bfsFindNines(i, j);
              totalScore += score;
          }
      }
  }

  return totalScore;
}

function calculateTrailheadRatings(map: number[][]): number {
  const rows = map.length;
  const cols = map[0].length;

  // Helper function to calculate the score of a given point
  function score(p: Point): number {
      const [x, y] = p;
      const h = map[x][y];

      // If the height is 9, return a score of 1 (this is a valid endpoint)
      if (h === 9) return 1;

      // Check valid neighbors to explore
      const directions: Point[] = [
          [-1, 0], [1, 0], [0, -1], [0, 1] // up, down, left, right
      ];

      let totalScore = 0;

      // Explore all neighbors for possible uphill paths
      for (const [dx, dy] of directions) {
          const nx = x + dx;
          const ny = y + dy;

          // Ensure the new coordinates are within bounds and the height increases by exactly 1
          if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && map[nx][ny] === h + 1) {
              totalScore += score([nx, ny]); // Recursively calculate score for the neighbor
          }
      }

      return totalScore;
  }

  // Function to calculate the rating of a trailhead
  function calculateTrailheadRating(x: number, y: number): number {
      // Only calculate the score if it's a valid trailhead (height 0)
      if (map[x][y] === 0) {
          return score([x, y]);
      }
      return 0;
  }

  let totalRating = 0;

  // Iterate over all points in the map
  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
          if (map[i][j] === 0) { // Trailhead
              const rating = calculateTrailheadRating(i, j);
              totalRating += rating;
          }
      }
  }

  return totalRating;
}


export const part1 = (input: string[]) => {
  return calculateTrailheadScores(input.map((row) => row.split("").map(Number)));
};

export const part2 = (input: string[]) => {
 return calculateTrailheadRatings(input.map((row) => row.split("").map(Number))); 
};

const DAY = Number("10")

export const main = async () => {
  const data = await readInputForDay(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

type Point = [number, number];


