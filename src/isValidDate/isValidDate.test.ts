import { isValidDate } from ".";

interface TestCase {
    statement: string;
    date: any;
    result?: boolean;
}
describe("Util: isValidDate", () => {
    const testCases: Array<TestCase> = [
        { statement: "Should return false if date is null", date: null, result: false },
        { statement: "Should return false if date is invalid type", date: "abcd", result: false },
        { statement: "Should return true if date is invalid", date: new Date("2020-99-55"), result: false },
        { statement: "Should return true if date is valid", date: new Date("2020-01-01"), result: true },
    ];
    testCases.map((testCase: TestCase) => {
        test(`- ${testCase.statement} | params: ${testCase.date} | result: ${testCase.result}`, () => {
            expect(isValidDate(testCase.date)).toEqual(testCase.result);
        });
    });
});
