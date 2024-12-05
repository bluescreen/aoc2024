import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p5";
import {  readInputForDayExampleRaw, readInputForDayRaw } from "../util";

const DAY = Number("5")
const EXAMPLE_PART1 = 143; 
const RESULT_PART1 = 5391; 

const EXAMPLE_PART2 = 123; 
const RESULT_PART2 = 6142; 



describe("day 5", () => {
  describe("part 5", () => {
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
