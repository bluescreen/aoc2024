import {  readInputForDayRaw } from "../util";

const parseInput = (rawInput: string) => {
  const [rules,updates] = rawInput.split('\n\n')
  return {
    rules: rules.split('\n').map(rule => rule.split('|').map(Number)),
    updates: updates.split('\n').map(update => update.split(',').map(Number))
  }
}

export const part1 = (input: string) => {
  const {rules, updates} = parseInput(input)
  return updates.reduce((acc, update) => {
    const sortedUpdate = [...update].sort((p1,p2) => {
      return rules.some(rule => rule[0] === p1 && rule[1] === p2) ? -1 : 1
    })
    if (update.join() !== sortedUpdate.join()) return acc
    const middlePage = Math.floor(update.length / 2);
    return acc + update[middlePage]
  }, 0)
}

export const part2 = (input: string) => {
  const {rules, updates} = parseInput(input)
  return updates.reduce((acc, update) => {
    const sorted = [...update].sort((p1,p2) => {
      return rules.some(rule => rule[0] === p1 && rule[1] === p2) ? -1 : 1
    })
    if (update.join() === sorted.join()) return acc
    const middlePage = Math.floor(update.length / 2);
    return acc + sorted[middlePage]
  }, 0)
}


const DAY = Number("5")

export const main = async () => {
  const data = await readInputForDayRaw(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

