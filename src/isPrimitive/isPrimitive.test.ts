import { isPrimitive } from ".";

interface TestCase {
    type: string;
    value: any;
    result?: boolean;
}
describe("Util: isPrimitive", () => {
    const testCases: Array<TestCase> = [
        { type: "String", value: "string", result: true },
        { type: "Number", value: 123, result: true },
        { type: "Boolean", value: false, result: true },
        { type: "Object", value: {}, result: false },
        { type: "Array", value: [], result: false },
        { type: "Map", value: new Map(), result: false },
    ];
    testCases.map((testCase: TestCase) => {
        test(`- ${testCase.type} | result: ${testCase.result}`, () => {
            expect(isPrimitive(testCase.value)).toEqual(testCase.result);
        });
    });
});
