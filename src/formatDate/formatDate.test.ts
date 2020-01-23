import { formatDate } from ".";
import { LocaleSpecifier } from "moment";
import { FormatDateOptions } from "./formatDate";

interface FormatDateTestCase extends FormatDateOptions {
    title: string;
    date: string | Date;
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
        },
        {
            title: "Should correctly format ISO string date without passing input or output formats",
            date: "2000-01-23T04:56:07.000+00:00",
            result: "January 23, 2000"
        }
    ];
    testCases.map((testCase: FormatDateTestCase) => {
        it(testCase.title, () => {
            expect(formatDate(testCase.date, { ...testCase })).toEqual(testCase.result);
        });
    });

    it("Should correctly format ISO string date without passing input or output formats", () => {
        const formatted: string = formatDate("2000-01-23T04:56:07.000+00:00", { locale: "en-US" });
        const newDate: Date = new Date(formatted);
        expect(formatted).toEqual("January 23, 2000");
        expect(newDate.getFullYear()).toEqual(2000);
        expect(newDate.getMonth()).toEqual(0);
        expect(newDate.getDate()).toEqual(23);
    });

    it("Should format without the need to pass options", () => {
        const newDate: Date = new Date(formatDate("2000-01-23T04:56:07.000+00:00"));
        expect(newDate.getFullYear()).toEqual(2000);
        expect(newDate.getMonth()).toEqual(0);
        expect(newDate.getDate()).toEqual(23);
    });
});