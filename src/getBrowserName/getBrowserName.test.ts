import { getBrowserName } from ".";

interface BrowserDetectorTestCase {
    statement: string;
    mockWindow: any;
    isDocument?: boolean;
    results: any;
}

describe("Util: getBrowserVersion", () => {
    const testCases: Array<BrowserDetectorTestCase> = [
        {
            statement: "Should return Opera when browser is opera",
            results: "Opera",
            mockWindow: { opr: { addons: {} } },
        },
        {
            statement: "Should return Opera when browser is opera",
            results: "Opera",
            mockWindow: { opera: {} },
        },
        {
            statement: "Should return Firefox when browser is firefox",
            results: "Firefox",
            mockWindow: { InstallTrigger: true },
        },
        {
            statement: "Should return Safari when browser is safari",
            results: "Safari",
            mockWindow: { HTMLElement: "constructor" },
        },
        {
            statement: "Should return Edge when browser is edge",
            results: "Edge",
            mockWindow: { isIE: false, StyleMedia: {} },
        },
        {
            statement: "Should return Chrome when browser is chrome",
            results: "Chrome",
            mockWindow: { chrome: { webstore: {}, runtime: {} } },
        },
        {
            statement: "Should return Chrome when browser is chrome",
            results: "Chrome",
            mockWindow: { chrome: { runtime: {} } },
        },
        {
            statement: "Should return Chrome when browser is chrome",
            results: "Chrome",
            mockWindow: { chrome: { webstore: {} } },
        },
        {
            statement: "Should return empty string when browser is not list",
            results: "",
            mockWindow: {},
        },
        {
            statement: "Should return IE when browser is ie",
            results: "IE",
            isDocument: true,
            mockWindow: { documentMode: {} },
        },
    ];
    testCases.map((testCase: BrowserDetectorTestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(
            testCase.mockWindow
        )} | result: ${String(testCase.results)}`, () => {
            const mockBrowser = testCase.isDocument ? "document" : "window";
            (global as any)[mockBrowser] = Object.create(
                testCase.isDocument ? document : window
            );
            (global as any)[mockBrowser] = testCase.mockWindow;
            expect(getBrowserName()).toStrictEqual(testCase.results);
        });
    });
});
