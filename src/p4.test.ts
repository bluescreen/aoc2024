import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p4";
import { readInputForDay, readInputForDayExample } from "../util";

const DAY = Number("4")
const EXAMPLE_PART1 = 18; 
const RESULT_PART1 = 2447; 

const EXAMPLE_PART2 = 9; 
const RESULT_PART2 = 1868; 



describe("day 4", () => {
  describe("part 4", () => {
    it("example", async () => {
      const data = await readInputForDayExample(DAY);
      expect(part1(data)).toEqual(EXAMPLE_PART1);
    });

    it("input", async () => {
      const data = await readInputForDay(DAY);
      expect(part1(data)).toEqual(RESULT_PART1);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(DAY);
      expect(part2(data)).toEqual(EXAMPLE_PART2);
    });

    it("input", async () => {
      const data = await readInputForDay(DAY);
      expect(part2(data)).toEqual(RESULT_PART2);
    });
  });
});
