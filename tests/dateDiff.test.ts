import { dateDiff } from "../src/dateDiff";

interface DifferenceDatesTestCase {
    statement: string;
    date1: any;
    date2: any;
    range: any;
    result?: number;
    isThrowError?: boolean;
}

describe("Util: dateDiff", () => {
    const testCases: Array<DifferenceDatesTestCase> = [
        { statement: "Should throw error if firstDate is invalid", date1: "abcd", date2: new Date(), range: "m", isThrowError: true},
        { statement: "Should throw error if secondDate is invalid", date1: new Date(), date2: "new Date()", range: "m", isThrowError: true},
        { statement: "Should return 1", date1: new Date("2019-12-11"), date2: new Date("2019-11-11"), range: "Month", result: 1}
    ];
    testCases.map((testCase: DifferenceDatesTestCase) => {
        test(`- ${testCase.statement} | params: ${JSON.stringify({date1: testCase.date1, date2: testCase.date2, range: testCase.range})}| result: ${testCase.result}`, () => {
            if (testCase.isThrowError) {
                expect(() => {
                    dateDiff(testCase.date1, testCase.date2, testCase.range);
                }).toThrow();
            } else {
                expect(dateDiff(testCase.date1, testCase.date2, testCase.range)).toEqual(testCase.result);
            }
        });
    });
});
