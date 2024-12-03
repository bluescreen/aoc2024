import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p3";
import { readInputForDay, readInputForDayExample } from "../util";

const DAY = Number("3")
const EXAMPLE_PART1 = 161; 
const RESULT_PART1 = 174336360; 

const EXAMPLE_PART2 = 48; 
const RESULT_PART2 = 88802350; 

describe("day 3", () => {
  describe("part 3", () => {
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
