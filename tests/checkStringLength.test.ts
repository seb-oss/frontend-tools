import { checkStringLength } from "../src/checkStringLength";

interface TestCase {
    statement: string;
    params: any;
    result: boolean;
}

describe("Util: checkStringLength", () => {
    const testCases: Array<TestCase> = [
        { statement: "Should return true for abc with min 3, max 4", params: { string: "abc", min: 3, max: 4 }, result: true },
        { statement: "Should return null for null", params: { string: null, min: 3, max: 4 }, result: null },
        { statement: "Should return false for abcd with length 2", params: { string: "abcd", min: 3, max: 3 }, result: false },
    ];
    testCases.map((testCase: TestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(testCase.params)} | result: ${testCase.result}`, () => {
            expect(checkStringLength(testCase.params.string, testCase.params.min, testCase.params.max)).toEqual(testCase.result);
        });
    });
});
