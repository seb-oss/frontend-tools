import { clearTime } from "../clearTime";
import { modifyDate } from ".";
import moment from "moment";

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
            result: clearTime(moment().toDate()),
            value: 1,
            type: "DIVIDE",
            range: "Month"
        },
        {
            statement: "Should return correct value for addition",
            date: new Date("2019-11-11"),
            result: clearTime(moment("2019-12-11", "YYYY-MM-DD").toDate()),
            value: 1,
            type: "ADD",
            range: "Month"
        },
        {
            statement: "Should return correct value for substraction",
            date: new Date("2019-1-11"),
            result: clearTime(moment("2018-12-11", "YYYY-MM-DD").toDate()),
            value: 1,
            type: "SUBTRACT",
            range: "Month"
        },
        {
            statement: "Should return today's date if invalid type passed",
            date: clearTime(new Date("2019-1-11")),
            result: clearTime(moment().toDate()),
            value: 1,
            type: "MULTIPLY",
            range: "Month"
        }
    ];
    testCases.map((testCase: DateRangeTestCase) => {
        test(`- ${testCase.statement} | result: ${testCase.result}`, () => {
            const result = clearTime(modifyDate(testCase.date, testCase.value, testCase.type, testCase.range));
            expect(result).toEqual(testCase.result);
        });
    });
});
