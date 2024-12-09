import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p9";
import {  readInputForDayExampleRaw, readInputForDayRaw } from "../util";

const DAY = Number("9")
const EXAMPLE_PART1 = 1928; 
const RESULT_PART1 = 6320029754031; 

const EXAMPLE_PART2 = 2858; 
const RESULT_PART2 = 6347435485773; 



describe("day 9", () => {
  describe("part 9", () => {
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
