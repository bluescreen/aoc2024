import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p19";
import { readInputForDayExampleRaw, readInputForDayRaw } from "../util";

const DAY = Number("19")
const EXAMPLE_PART1 = 6; 
const RESULT_PART1 = 347; 

const EXAMPLE_PART2 = 16; 
const RESULT_PART2 = 919219286602165; 



describe("day 19", () => {
  describe("part 19", () => {
    it("example", async () => {
      const data = await readInputForDayExampleRaw(DAY);
      expect(part1(data)).toEqual(EXAMPLE_PART1);
    });

    it("input", async () => {
      const data = await readInputForDayRaw(DAY);
      expect(part1(data)).toEqual(RESULT_PART1);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExampleRaw(DAY);
      expect(part2(data)).toEqual(EXAMPLE_PART2);
    });

    it("input", async () => {
      const data = await readInputForDayRaw(DAY);
      expect(part2(data)).toEqual(RESULT_PART2);
    });
  });
});
