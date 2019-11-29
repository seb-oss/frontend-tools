import { isStrongPassword } from "../src/isStrongPassword";

interface TestCase {
    statement: string;
    params: any;
    result: boolean;
}
describe("Util: isStrongPassword", () => {
    const testCases: Array<TestCase> = [
        { statement: "Should return false for object", params: { string: "abc", string2: "abc" }, result: false },
        { statement: "Should return false for null", params: null, result: false },
        { statement: "Should return false for random string", params: "1asdf2345645", result: false },
        { statement: "Should return true for strong password", params: "Ju2t3hBqXJ4ydWE", result: true },
    ];
    testCases.map((testCase: TestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(testCase.params)} | result: ${testCase.result}`, () => {
            expect(isStrongPassword(testCase.params)).toEqual(testCase.result);
        });
    });
});
