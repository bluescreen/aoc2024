import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p8";
import { readInputForDay, readInputForDayExample } from "../util";

const DAY = Number("8")
const EXAMPLE_PART1 = 14; 
const RESULT_PART1 = 344; 

const EXAMPLE_PART2 = 34; 
const RESULT_PART2 = 1182; 



describe("day 8", () => {
  describe("part 8", () => {
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
