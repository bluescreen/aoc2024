export function zip<T, U>(a: T[], b: U[]): [T, U][] {
    return a.map((item, index) => [item, b[index]]);
  }

export const unzip = <T, U>(list: [T, U][]): [T[], U[]] => {
  const first = list.map(([a, _]) => a);
  const second = list.map(([_, b]) => b);
  return [first, second];
}