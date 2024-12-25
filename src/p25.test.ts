import { expect, describe, test as it } from "bun:test";
import { part1 } from "./p25";
import { readInputForDay, readInputForDayExample, readInputForDayExampleRaw, readInputForDayRaw } from "../util";

const DAY = Number("25")
const EXAMPLE_PART1 = 3; 
const RESULT_PART1 = 3249; 

describe("day 25", () => {
  describe("part 25", () => {
    it("example", async () => {
      const data = await readInputForDayExampleRaw(DAY);
      expect(part1(data)).toEqual(EXAMPLE_PART1);
    });

    it("input", async () => {
      const data = await readInputForDayRaw(DAY);
      expect(part1(data)).toEqual(RESULT_PART1);
    });
  });


});
