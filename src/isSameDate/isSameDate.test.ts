import { isSameDate } from ".";

interface TestCase {
    statement: string;
    date1: any;
    date2: any;
    result?: boolean;
}
describe("Util: isSameDate", () => {
    const testCases: Array<TestCase> = [
        {
            statement: "Should return false if firstDate is invalid",
            date1: "abcd",
            date2: new Date(),
            result: false,
        },
        {
            statement: "Should return false if secondDate is invalid",
            date1: new Date(),
            date2: "new Date()",
            result: false,
        },
        {
            statement: "Should return false if dates are not same",
            date1: new Date("2019-12-11"),
            date2: new Date("2019-11-11"),
            result: false,
        },
        {
            statement: "Should return true if dates are same",
            date1: new Date("2019-12-11"),
            date2: new Date("2019-12-11"),
            result: true,
        },
        {
            statement: "Should return false if dates are not same",
            date1: new Date("2019-12-11"),
            date2: new Date("2019-12-12"),
            result: false,
        },
    ];
    testCases.map((testCase: TestCase) => {
        test(`- ${testCase.statement} | params: ${JSON.stringify({
            date1: testCase.date1,
            date2: testCase.date2,
        })} | result: ${testCase.result}`, () => {
            expect(isSameDate(testCase.date1, testCase.date2)).toEqual(
                testCase.result
            );
        });
    });
});
