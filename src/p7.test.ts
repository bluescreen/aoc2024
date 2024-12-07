import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p7";
import { readInputForDay, readInputForDayExample } from "../util";

const DAY = Number("7")
const EXAMPLE_PART1 = 3749; 
const RESULT_PART1 = 4998764814652; 

const EXAMPLE_PART2 = 11387; 
const RESULT_PART2 = 37598910447546; 



describe("day 7", () => {
  describe("part 7", () => {
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
