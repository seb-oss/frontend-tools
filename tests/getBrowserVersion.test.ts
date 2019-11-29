import { getBrowserVersion } from "../src/getBrowserVersion";

interface BrowserDetailsTestCase {
    statement: string;
    mockNavigator: any;
    results: any;
}

describe("Util: getBrowserVersion", () => {
    const testCases: Array<BrowserDetailsTestCase> = [
        {
            statement: "Should 11",
            mockNavigator: { userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"},
            results: 11
        },
        {
            statement: "Should return 0 for ie version if no rv found",
            mockNavigator: { userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS) like Gecko"},
            results: 0
        },
        {
            statement: "Should return 74",
            mockNavigator: { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"},
            results: 74
        },
        {
            statement: "Should return 0 if browser is random",
            mockNavigator: { userAgent: "Mozilla (Windows NT 10.0; Win64; x64) AppleWebKit (KHTML, like Gecko) Chrome/43 Safari OPR"},
            results: 0
        },
        {
            statement: "Should return 12",
            mockNavigator: { userAgent: "Opera/9.80 (Windows NT 6.1; WOW64) Presto/2.12.388 Version/12.18"},
            results: 12
        },
        {
            statement: "Should return 17",
            mockNavigator: { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134"},
            results: 17
        },
        {
            statement: "Should return 12",
            mockNavigator: { userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1"},
            results: 12
        },
        {
            statement: "Should return undefined if no valid user agent passed",
            mockNavigator: { userAgent: ""},
            results: 0
        }
    ];
    testCases.map((testCase: BrowserDetailsTestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(testCase.mockNavigator)} | result: ${String(testCase.results)}`, () => {
            (global as any).navigator = Object.create(navigator);
            (global as any).navigator = testCase.mockNavigator;
            expect(getBrowserVersion()).toStrictEqual(testCase.results);
        });
    });
});
