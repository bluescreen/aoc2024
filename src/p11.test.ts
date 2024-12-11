import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p11";
import { readInputForDay, readInputForDayExample, readInputForDayExampleRaw, readInputForDayRaw } from "../util";

const DAY = Number("11")
const EXAMPLE_PART1 = 55312; 
const RESULT_PART1 = 203609; 
const RESULT_PART2 = 240954878211138; 



describe("day 11", () => {
  describe("part 11", () => {
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

    it("input", async () => {
      const data = await readInputForDayRaw(DAY);
      expect(part2(data)).toEqual(RESULT_PART2);
    });
  });
});
