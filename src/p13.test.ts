import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p13";
import { readInputForDayExampleRaw, readInputForDayRaw } from "../util";

const DAY = Number("13")
const EXAMPLE_PART1 = 480; 
const RESULT_PART1 = 33209; 

const RESULT_PART2 = 83102355665474; 



describe("day 13", () => {
  describe("part 13", () => {
    it("example", async () => {
      const data = await readInputForDayExampleRaw(DAY);
      expect(part1(data)).toEqual(EXAMPLE_PART1);
    });

    it("input", async () => {
      const data = await readInputForDayExampleRaw(DAY);
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
