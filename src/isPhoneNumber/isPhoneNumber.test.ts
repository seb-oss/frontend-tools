import { isPhoneNumber } from ".";

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
        { statement: "Should accept numbers that are 4 digits long", params: "1234", result: true },
        { statement: "Should not accept numbers less than 4 digits long", params: "123", result: false },
        { statement: "Should accept numbers that are 15 digits long", params: "012345678912345", result: true },
        { statement: "Should not accept numbers longer than 15 digits long", params: "0123456789123456", result: false },
    ];
    testCases.map((testCase: TestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(testCase.params)} | result: ${testCase.result}`, () => {
            expect(isPhoneNumber(testCase.params)).toEqual(testCase.result);
        });
    });
});
