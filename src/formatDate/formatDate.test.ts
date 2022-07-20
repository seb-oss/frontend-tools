import { formatDate } from ".";

interface FormatDateTestCase {
    title: string;
    date: string | Date;
    format?: Intl.DateTimeFormatOptions;
    locale?: string;
    result: string;
}

const today: Date = new Date();

describe("Util: formatDate", () => {
    const testCases: Array<FormatDateTestCase> = [
        {
            title: "Should format to Swedish by default",
            date: "7-12-1987",
            result: "12 juli 1987",
        },
        {
            title: "Should use other locale when passed (en-US)",
            date: "7-12-1987",
            result: "July 12, 1987",
            locale: "en-US",
        },
        {
            title: "Should return a string of the input if it's an invalid date",
            date: "it's a string",
            result: "it's a string",
        },
        {
            title: "Should correctly format ISO string date without passing input or output formats",
            date: "2000-01-23T04:56:07.000+00:00",
            result: "23 januari 2000",
        },
        {
            title: "Should accept date object",
            date: new Date(),
            format: { day: "numeric", month: "numeric", year: "numeric" },
            result: today.toLocaleDateString("sv-SE"),
        },
        {
            title: "Should accept custom format",
            date: new Date(),
            format: { day: "numeric", month: "numeric" },
            result: `${today.getDate()}/${today.getMonth() + 1}`,
        },
        {
            title: "Should not crash when passing null as format and locale",
            date: new Date(),
            format: null,
            locale: null,
            result: today.toLocaleString("sv-SE").split(" ")[0],
        },
    ];
    testCases.map(
        ({ title, date, format, locale, result }: FormatDateTestCase) => {
            // prettier-ignore
            it(`${title} (Sample: ${String(date)} - Returns: ${result})`, () => {
                expect(formatDate(date, format, locale)).toEqual(result);
            });
        }
    );
});
