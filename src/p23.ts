import { readInputForDay, readInputForDayExample } from "../util";

type Graph = Record<string, Set<string>>

const findTriangles = (graph: Graph): string[][] => {
  const triangles: string[][] = [];

  for (const node of Object.keys(graph)) {
    for (const neighbor1 of graph[node]) {
      for (const neighbor2 of graph[neighbor1]) {
        if (neighbor2 !== node && graph[node].has(neighbor2)) {
          const triangle = [node, neighbor1, neighbor2].sort();
          const triangleKey = triangle.join("-");
          if (!triangles.some(t => t.join("-") === triangleKey)) {
            triangles.push(triangle);
          }
        }
      }
    }
  }

  return triangles;
};

const findLargestClique = (graph: Graph): string[] => {
  const bronKerbosch = (
    R: Set<string>,
    P: Set<string>,
    X: Set<string>,
    cliques: string[][]
  ) => {
    if (P.size === 0 && X.size === 0) {
      cliques.push([...R]);
      return;
    }

    for (const v of [...P]) {
      const neighbors = graph[v] || new Set();
      bronKerbosch(
        new Set([...R, v]),
        new Set([...P].filter((x) => neighbors.has(x))),
        new Set([...X].filter((x) => neighbors.has(x))),
        cliques
      );
      P.delete(v);
      X.add(v);
    }
  };

  const allNodes = new Set(Object.keys(graph));
  const cliques: string[][] = [];
  bronKerbosch(new Set(), allNodes, new Set(), cliques);

  let largestClique: string[] = [];
  for (const clique of cliques) {
    if (clique.length > largestClique.length) {
      largestClique = clique;
    }
  }
  return largestClique;
};

export const part1 = (input: string[]) => {
  const graph: Graph = parseGraph(input);
  const triangles = findTriangles(graph);

  return triangles.filter(triangle => 
    triangle.some(computer => computer.startsWith("t"))
  ).length;
};

export const part2 = (input: string[]) => {
  const graph: Graph = parseGraph(input);
  const largestClique = findLargestClique(graph);
 return largestClique.sort().join(",");
};

const DAY = Number("23")

export const main = async () => {
  const data = await readInputForDay(DAY);
  // console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


function parseGraph(input: string[]) {
  const graph: Graph = {};

  input.forEach((connection) => {
    const [a, b] = connection.split("-");
    if (!graph[a]) graph[a] = new Set();
    if (!graph[b]) graph[b] = new Set();
    graph[a].add(b);
    graph[b].add(a);
  });
  return graph;
}

