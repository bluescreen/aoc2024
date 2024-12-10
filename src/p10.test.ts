import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p10";
import { readInputForDay, readInputForDayExample } from "../util";

const DAY = Number("10")
const EXAMPLE_PART1 = 36; 
const RESULT_PART1 = 644; 

const EXAMPLE_PART2 = 81; 
const RESULT_PART2 = 1366; 



describe("day 10", () => {
  describe("part 10", () => {
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
