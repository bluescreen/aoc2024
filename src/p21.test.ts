import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p21";
import { readInputForDay, readInputForDayExample } from "../util";

const DAY = Number("21")
const EXAMPLE_PART1 = 0; 
const RESULT_PART1 = 0; 

const EXAMPLE_PART2 = 0; 
const RESULT_PART2 = 0; 



describe("day 21", () => {
  describe("part 21", () => {
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
