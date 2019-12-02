import { randomId } from "../src/randomId";

interface TestCase {
    statement: string;
    params: any;
}

describe("Util: randomId", () => {
    const testCases: Array<TestCase> = [
        { statement: "Should return random id with start with randID", params: "randID" },
        { statement: "Should return random id with start with seeeddd", params: "seeeddd" },
    ];
    testCases.map((testCase: TestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(testCase.params)}`, () => {
            expect(randomId(testCase.params)).toMatch(testCase.params);
        });
    });
});
