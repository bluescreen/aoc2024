import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p14";
import { readInputForDay, readInputForDayExample } from "../util";

const DAY = Number("14")
const EXAMPLE_PART1 = 12; 
const RESULT_PART1 = 223020000; 

const RESULT_PART2 = 7338; 



describe("day 14", () => {
  describe("part 14", () => {
    it("example", async () => {
      const data = await readInputForDayExample(DAY);
      expect(part1(data, 11,7)).toEqual(EXAMPLE_PART1);
    });

    it("input", async () => {
      const data = await readInputForDay(DAY);
      expect(part1(data,101, 103)).toEqual(RESULT_PART1);
    });
  });

  describe("part 2", () => {
    it("input", async () => {
      const data = await readInputForDay(DAY);
      expect(part2(data)).toEqual(RESULT_PART2);
    });
  });
});
