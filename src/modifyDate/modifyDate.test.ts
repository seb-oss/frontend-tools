import { clearTime } from "../clearTime";
import { modifyDate } from ".";

interface DateRangeTestCase {
    statement: string;
    date: any;
    value: any;
    type: any;
    range: any;
    result: Date;
}
describe("Util: modifyDate", () => {
    const testCases: Array<DateRangeTestCase> = [
        {
            statement: "Should return today's date if date is invalid",
            date: "abcd",
            result: clearTime(new Date()),
            value: 1,
            type: "DIVIDE",
            range: "month"
        },
        {
            statement: "Should return correct value for addition",
            date: new Date("2019-11-11"),
            result: clearTime(new Date("2019-12-11")),
            value: 1,
            type: "ADD",
            range: "month"
        },
        {
            statement: "Should automatically account for leap years when making changes to dates",
            date: new Date("2020-02-29"),
            result: clearTime(new Date("2021-03-01")),
            value: 1,
            type: "ADD",
            range: "year"
        },
        {
            statement: "Should return correct value for substraction",
            date: new Date("2019-01-11"),
            result: clearTime(new Date("2018-12-11")),
            value: 1,
            type: "SUBTRACT",
            range: "month"
        },
        {
            statement: "Should return today's date if invalid type MULTIPLY passed",
            date: clearTime(new Date("2019-01-11")),
            result: clearTime(new Date()),
            value: 1,
            type: "MULTIPLY",
            range: "month"
        }
    ];
    testCases.map((testCase: DateRangeTestCase) => {
        test(`- ${testCase.statement} | result: ${testCase.result}`, () => {
            const result = clearTime(modifyDate(testCase.date, testCase.value, testCase.type, testCase.range));
            expect(result).toEqual(testCase.result);
        });
    });
});
