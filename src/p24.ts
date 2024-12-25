import { readInputForDay, readInputForDayExample, readInputForDayExampleRaw, readInputForDayRaw } from "../util";

type WireValues = Record<string, number>;
type Gate = {
    input1: string;
    input2: string;
    output: string;
    operation: 'AND' | 'OR' | 'XOR';
};

function parseInput(input: string): { initialValues: WireValues; gates: Gate[] } {
    const [valuesPart, gatesPart] = input.split('\n\n');
    const initialValues: WireValues = {};

    valuesPart.split('\n').forEach((line) => {
        const [wire, value] = line.split(': ');
        initialValues[wire] = parseInt(value, 10);
    });

    const gates: Gate[] = gatesPart.split('\n').map((line) => {
        const [left, output] = line.split(' -> ');
        const [input1, operation, input2] = left.split(' ');
        return { input1, input2, output, operation: operation as 'AND' | 'OR' | 'XOR' };
    });

    return { initialValues, gates };
}

function simulateCircuit(initialValues: WireValues, gates: Gate[]): WireValues {
    const wireValues: WireValues = { ...initialValues };

    while (true) {
        let updated = false;

        for (const { input1, input2, output, operation } of gates) {
            if (output in wireValues) continue;

            if (input1 in wireValues && input2 in wireValues) {
                const value1 = wireValues[input1];
                const value2 = wireValues[input2];
                wireValues[output] =
                    operation === 'AND' ? value1 & value2 :
                    operation === 'OR' ? value1 | value2 :
                    value1 ^ value2;
                updated = true;
            }
        }

        if (!updated) break;
    }


    return wireValues;
}

function computeOutputDecimal(wireValues: WireValues): number {
    const zWires = Object.keys(wireValues)
        .filter((wire) => wire.startsWith('z'))
        .sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));

    const binaryString = zWires.map((wire) => wireValues[wire]).reverse().join('');
    console.log(binaryString)
    return parseInt(binaryString, 2);
}

function findSwappedWires(input: string, bitCount: number): string {
    const { initialValues, gates } = parseInput(input);

    const xWires = Array.from({ length: bitCount }, (_, i) => `x${i.toString().padStart(2, '0')}`);
    const yWires = Array.from({ length: bitCount }, (_, i) => `y${i.toString().padStart(2, '0')}`);
    const zWires = Array.from({ length: bitCount + 1 }, (_, i) => `z${i.toString().padStart(2, '0')}`);

    const swappedWires: Set<string> = new Set();
    let carry = 0;

    for (let i = 0; i < bitCount; i++) {
        const x = xWires[i];
        const y = yWires[i];
        const z = zWires[i];

        const expectedSum = (carry + (initialValues[x] || 0) + (initialValues[y] || 0)) % 2;
        const expectedCarry = Math.floor((carry + (initialValues[x] || 0) + (initialValues[y] || 0)) / 2);

        const gatesForZ = gates.filter((gate) => gate.output === z);
        const gatesForCarry = gates.filter((gate) => gate.output.startsWith(`carry${i}`));

        if (!verifyFullAdderGates(gatesForZ, gatesForCarry, expectedSum, expectedCarry)) {
            swappedWires.add(z);
            swappedWires.add(`carry${i}`);
        }

        carry = expectedCarry;
    }

    return Array.from(swappedWires).sort().join(',');
}

export const part1 = (input: string) => {
  const { initialValues, gates } = parseInput(input);
  const finalWireValues = simulateCircuit(initialValues, gates);
  return computeOutputDecimal(finalWireValues);
};

export const part2 = (input: string) => {
  const bitCount = 6;
 return findSwappedWires(input, bitCount); 
};

const DAY = Number("24")

export const main = async () => {
  const data = await readInputForDayExampleRaw(DAY,3);
  //console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};


