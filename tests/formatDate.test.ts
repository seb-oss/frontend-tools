import { formatDate } from "../src/formatDate";
import moment from "moment";

interface FormatDateTestCase {
    title: string;
    date: string | Date;
    inputFormat: string;
    outputFormat: string;
    locale?: moment.LocaleSpecifier;
    result: string;
}

describe("Util: formatDate", () => {
    const testCases: Array<FormatDateTestCase> = [
        {
            title: "Should return formatted Date",
            date: "7-12-1987",
            inputFormat: "D-MM-YYYY",
            outputFormat: "MM-DD-YYYY",
            result: "12-07-1987"
        },
        {
            title: "Should return null when date is invalid",
            date: "it's a string",
            inputFormat: "D-MM-YYYY",
            outputFormat: "MM-DD-YYYY",
            result: null
        },
        {
            title: "Should return null if date is invalid and invalid output is undefined",
            date: null,
            inputFormat: "D-MM-YYYY",
            outputFormat: "MM-DD-YYYY",
            result: null
        },
        {
            title: "Should return formatted Date based on locale",
            date: new Date("12-7-1987"),
            inputFormat: "D-MM-YYYY",
            outputFormat: "YYYY MMM DD",
            locale: "sv-SE",
            result: "1987 dec 07"
        }
    ];
    testCases.map((testCase: FormatDateTestCase) => {
        it(testCase.title, () => {
            expect(formatDate(testCase.date, testCase.inputFormat, testCase.outputFormat, testCase.locale)).toEqual(testCase.result);
        });
    });
});
