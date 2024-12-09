import { readInputForDayRaw } from "../util";

type Disc = { pos: number; size: number; fileID: number; }[];

type Block = (number | null);

function solveDiskCompaction(diskMap: string, part2: boolean): number {
  const disc: { pos: number; size: number; fileID: number }[] = [];

  const spaces: { pos: number; size: number }[] = [];
  const blocks: (number | null)[] = [];
  
  readDisc(diskMap, part2, disc, blocks, spaces);
  reorderDisc(disc, spaces, blocks);
  return calcChecksum(blocks);
}

function reorderDisc(disc: Disc, spaces: { pos: number; size: number; }[],  blocks: Block[]) {
  for (let i = disc.length - 1; i >= 0; i--) {
    const { pos, size, fileID } = disc[i];
    for (let j = 0; j < spaces.length; j++) {
      const { pos: spacePos, size: spaceSize } = spaces[j];
      if (spacePos < pos && size <= spaceSize) {
        for (let k = 0; k < size; k++) {
          blocks[pos + k] = null;
          blocks[spacePos + k] = fileID;
        }
        spaces[j] = { pos: spacePos + size, size: spaceSize - size };
        break;
      }
    }
  }
}

function readDisc(diskMap: string, part2: boolean, disc: Disc, blocks: Block[], spaces: { pos: number; size: number; }[]) {
  let fileID = 0;
  let pos = 0;
  for (let i = 0; i < diskMap.length; i++) {
    const value = parseInt(diskMap[i]);
    if (i % 2 === 0) {
      if (part2) {
        disc.push({ pos, size: value, fileID });
      }
      for (let j = 0; j < value; j++) {
        blocks[pos] = fileID;
        if (!part2) {
          disc.push({ pos, size: 1, fileID });
        }
        pos++;
      }
      fileID++;
    } else {
      spaces.push({ pos, size: value });
      for (let j = 0; j < value; j++) {
        blocks[pos] = null;
        pos++;
      }
    }
  }
}

function calcChecksum(blocks: Block[]) {
  let checksum = 0;
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block !== null) {
      checksum += i * block;
    }
  }
  return checksum;
}


export const part1 = (input: string) => {
  return solveDiskCompaction(input, false);
};

export const part2 = (input: string) => {
  return solveDiskCompaction(input, true);
};

const DAY = Number("9")

export const main = async () => {
  const data = await readInputForDayRaw(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};




