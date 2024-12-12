import { printGrid, readInputForDay, readInputForDayExample } from "../util";

type GardenMap = string[][];

const directions = [
  [-1, 0], // up
  [1, 0],  // down
  [0, -1], // left
  [0, 1]   // right
];

function calculateTotalFencingCost(map: GardenMap, mode: number): number {
  const rows = map.length;
  const cols = map[0].length;

  const visited = new Set<string>();
  const posKey = (x: number, y: number) => `${x},${y}`;

  const directions = [
      [-1, 0], // up
      [1, 0],  // down
      [0, -1], // left
      [0, 1]   // right
  ];

  function floodFill(x: number, y: number): { area: number; borderCount: number; sideCount: number } {
      const type = map[x][y];
      let area = 0;
      let borderCount = 0;
      let sideCount = 0;

      const stack: [number, number][] = [[x, y]];
      visited.add(posKey(x, y));

      const edges: Set<string>[] = directions.map(() => new Set<string>());

      while (stack.length > 0) {
          const [cx, cy] = stack.pop()!;
          area++;

          for (let i = 0; i < directions.length; i++) {
              const [dx, dy] = directions[i];
              const nx = cx + dx;
              const ny = cy + dy;

              const sidePosKey = `${nx},${ny}`;
              if (nx < 0 || nx >= rows || ny < 0 || ny >= cols || map[nx][ny] !== type) {
                  borderCount++;
                  edges[i].add(sidePosKey);
              } else if (!visited.has(posKey(nx, ny))) {
                  visited.add(posKey(nx, ny));
                  stack.push([nx, ny]);
              }
          }
      }

      for (let i = 0; i < directions.length; i++) {
          const toRemove = new Set<string>();
          for (const xy of edges[i]) {
              const [dx, dy] = directions[i];
              let [nx, ny] = xy.split(",").map(Number);
              nx += dx;
              ny += dy;

              while (edges[i].has(`${nx},${ny}`)) {
                  toRemove.add(`${nx},${ny}`);
                  nx += dx;
                  ny += dy;
              }
          }
          console.log(edges)
          sideCount += edges[i].size - toRemove.size;
      }

      return { area, borderCount, sideCount };
  }

  let totalCost = 0;

  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
          if (!visited.has(posKey(i, j))) {
              const { area, borderCount, sideCount } = floodFill(i, j);
              const count = mode === 1 ? borderCount : sideCount;
              totalCost += area * count;
          }
      }
  }

  return totalCost;
}

export const part1 = (input: string[]) => {
  return calculateTotalFencingCost(input.map((row) => row.split("")),1);
};

export const part2 = (input: string[]) => {
  return calculateTotalFencingCost(input.map((row) => row.split("")),2);
};

const DAY = Number("12")

export const main = async () => {
  const data = await readInputForDayExample(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


