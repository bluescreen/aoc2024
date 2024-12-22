import { readInputForDay, readInputForDayExample } from "../util";



function getNextSecret(secret: number): number {
  let value1 = (secret * 64) % 16777216;
  secret ^= value1;
  secret %= 16777216;

  let value2 = Math.floor(secret / 32);
  secret ^= value2;
  secret %= 16777216;

  let value3 = (secret * 2048) % 16777216;
  secret ^= value3;
  secret %= 16777216;

  return secret;
}

function nextSecretNumber(secret: number): number {
  for (let i = 0; i < 2000; i++) {
      secret = getNextSecret(secret); 
  }
  return secret;
}

function calculateSumOf2000thSecrets(initialSecrets: number[]): number {
  let totalSum = 0;

  for (const secret of initialSecrets) {
      const finalSecret = nextSecretNumber(secret);
      totalSum += finalSecret;
  }

  return totalSum;
}

function findBestSequence(initialSecrets: number[]):  number  {
  const total = new Map<string, number>(); 
  const numPrices = 2000;

  for (const initialSecret of initialSecrets) {
      let secret = initialSecret;
      let lastPrice = secret % 10;
      const pattern: [number, number][] = []; 

      for (let i = 0; i < numPrices; i++) {
          secret = getNextSecret(secret);
          const currentPrice = secret % 10;
          pattern.push([currentPrice - lastPrice, currentPrice]);
          lastPrice = currentPrice;
      }

      const seen = new Set<string>();
      for (let i = 0; i <= pattern.length - 4; i++) {
          const pat = pattern.slice(i, i + 4).map(x => x[0]).join(",");
          const value = pattern[i + 3][1];

          if (!seen.has(pat)) {
              seen.add(pat);
              total.set(pat, (total.get(pat) || 0) + value);
          }
      }
  }

  let bestSequence: number[] = [];
  let maxBananas = 0;

  for (const [sequenceKey, totalBananas] of total.entries()) {
      if (totalBananas > maxBananas) {
          maxBananas = totalBananas;
          bestSequence = sequenceKey.split(",").map(Number);
      }
  }

  return maxBananas;
}


export const part1 = (input: string[]) => {
  const numbers = input.map(Number);
  return calculateSumOf2000thSecrets(numbers);

};

export const part2 = (input: string[]) => {
  const numbers = input.map(Number);
 return  findBestSequence(numbers);; 
};

const DAY = Number("22")

export const main = async () => {
  const data = await readInputForDay(DAY);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


