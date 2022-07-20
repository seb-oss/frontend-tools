import { dateDiff } from ".";

interface DifferenceDatesTestCase {
    statement: string;
    date1: any;
    date2: any;
    range?: any;
    result?: number;
    isThrowError?: boolean;
    isWarn?: boolean;
}

describe("Util: dateDiff", () => {
    let consoleWarn: jasmine.Spy;
    beforeEach(() => {
        consoleWarn = spyOn(global.console, "warn");
    });
    const testCases: Array<DifferenceDatesTestCase> = [
        {
            statement: "Should throw error if firstDate is invalid",
            date1: "abcd",
            date2: new Date(),
            isThrowError: true,
        },
        {
            statement: "Should throw error if secondDate is invalid",
            date1: new Date(),
            date2: "new Date()",
            isThrowError: true,
        },
        {
            statement: "Should throw warning if deprecated argument was used",
            date1: new Date(),
            date2: new Date(),
            range: "year",
            isWarn: true,
            result: 0,
        },
        {
            statement: "Should return 1",
            date1: new Date("2020-01-01"),
            date2: new Date("2020-01-02"),
            result: 1,
        },
        {
            statement: "Should return 1",
            date1: new Date("2020-01-02"),
            date2: new Date("2020-01-01"),
            result: -1,
        },
    ];
    testCases.map((testCase: DifferenceDatesTestCase) => {
        test(`- ${testCase.statement} | params: ${JSON.stringify({
            date1: testCase.date1,
            date2: testCase.date2,
            range: testCase.range,
        })}| result: ${testCase.result}`, () => {
            if (testCase.isThrowError) {
                expect(() => {
                    dateDiff(testCase.date1, testCase.date2);
                }).toThrow();
            } else {
                expect(
                    dateDiff(testCase.date1, testCase.date2, testCase.range)
                ).toEqual(testCase.result);
                if (testCase.isWarn) {
                    expect(consoleWarn).toHaveBeenCalledTimes(1);
                }
            }
        });
    });
});
