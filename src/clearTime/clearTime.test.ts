import { clearTime } from ".";
import moment from "moment";

interface TestCase {
    statement: string;
    date: any;
    result: Date;
}

const getNewDateAtMidnight = (date?: string): Date => {
    const newDate = date ? new Date(date) : new Date();
    newDate.setHours(0, 0, 0, 0);
    return newDate;
};

describe("Util: modifyDate", () => {
    const testCases: Array<TestCase> = [
        {
            statement: "Should return today's date if date is invalid",
            date: "2019-11-11",
            result: getNewDateAtMidnight("2019-11-11"),
        },
        {
            statement: "Should return 2019-11-11",
            date: new Date("2019-11-11"),
            result: getNewDateAtMidnight("2019-11-11"),
        },
        {
            statement: "Should return 2019-1-11",
            date: new Date("2019-1-11"),
            result: getNewDateAtMidnight("2019-1-11"),
        }
    ];
    testCases.map((testCase: TestCase) => {
        test(`- ${testCase.statement} | result: ${testCase.result}`, () => {
            expect(clearTime(testCase.date)).toEqual(testCase.result);
        });
    });
});
