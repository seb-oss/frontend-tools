import { isPhoneNumber } from "../src/isPhoneNumber";

interface TestCase {
    statement: string;
    params: any;
    result: boolean;
}

describe("Util: isPhoneNumber", () => {
    const testCases: Array<TestCase> = [
        { statement: "Should return false for object", params: { string: "abc", string2: "abc" }, result: false },
        { statement: "Should return false for null", params: null, result: false },
        { statement: "Should return false for random string", params: "asbcdasdf", result: false },
        { statement: "Should return true for valid phone", params: "06449561629", result: true },
        { statement: "Should return true for valid phone", params: "6449561629", result: true },
    ];
    testCases.map((testCase: TestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(testCase.params)} | result: ${testCase.result}`, () => {
            expect(isPhoneNumber(testCase.params)).toEqual(testCase.result);
        });
    });
});
