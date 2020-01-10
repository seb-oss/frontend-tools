import { isEmail } from ".";

interface TestCase {
    statement: string;
    params: any;
    result: boolean;
}

describe("Util: isEmail", () => {
    const testCases: Array<TestCase> = [
        { statement: "Should return false for object", params: { string: "abc", string2: "abc" }, result: false },
        { statement: "Should return false for null", params: null, result: false },
        { statement: "Should return false for random string", params: "asbcdasdf", result: false },
        { statement: "Should return true for valid email", params: "Lonny_Frami@gmail.com", result: true },
    ];
    testCases.map((testCase: TestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(testCase.params)} | result: ${testCase.result}`, () => {
            expect(isEmail(testCase.params)).toEqual(testCase.result);
        });
    });
});
