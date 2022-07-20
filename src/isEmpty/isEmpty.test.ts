import { isEmpty } from ".";

interface TestCase {
    statement: string;
    params: any;
    result: boolean;
}

describe("Util: isEmpty", () => {
    const newFunction = () => {
        console.log();
    };
    const testCases: Array<TestCase> = [
        {
            statement: "Should return true for undefined",
            params: undefined,
            result: true,
        },
        {
            statement: "Should return true for null",
            params: null,
            result: true,
        },
        {
            statement: "Should return false for date",
            params: new Date(),
            result: false,
        },
        {
            statement: "Should return false for function",
            params: newFunction,
            result: false,
        },
        {
            statement: "Should return false for non-empty object",
            params: { a: 1 },
            result: false,
        },
        {
            statement: "Should return true for empty object",
            params: {},
            result: true,
        },
        {
            statement: "Should return true for empty array",
            params: [],
            result: true,
        },
        {
            statement: "Should return false for valid string",
            params: "abc",
            result: false,
        },
    ];
    testCases.map((testCase: TestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(
            testCase.params
        )} | result: ${testCase.result}`, () => {
            expect(isEmpty(testCase.params)).toEqual(testCase.result);
        });
    });
});
