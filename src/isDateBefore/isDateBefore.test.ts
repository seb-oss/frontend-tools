import { isDateBefore } from ".";

interface TestCase {
    statement: string;
    date1: any;
    date2: any;
    result?: boolean;
}
describe("Util: isDateBefore", () => {
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
            statement: "Should return true if date1 is before date2",
            date1: new Date("2019-12-25"),
            date2: new Date("2019-12-28"),
            result: true,
        },
        {
            statement: "Should return false if date1 is not before date2",
            date1: new Date("2023-03-04"),
            date2: new Date("2023-02-15"),
            result: false,
        },
        {
            statement: "Should return false if both dates are the same",
            date1: new Date("2020-01-01"),
            date2: new Date("2020-01-01"),
            result: false,
        },
        {
            statement:
                "Should ignore the time and return false if the two dates are equal",
            date1: new Date("2019-11-11 23:00:00"),
            date2: new Date("2019-11-11 11:00:00"),
            result: false,
        },
    ];
    testCases.map((testCase: TestCase) => {
        test(`- ${testCase.statement} | params: ${JSON.stringify({
            date1: testCase.date1,
            date2: testCase.date2,
        })} | result: ${testCase.result}`, () => {
            expect(isDateBefore(testCase.date1, testCase.date2)).toEqual(
                testCase.result
            );
        });
    });
});
