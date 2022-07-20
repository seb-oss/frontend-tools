import { isBrowserChrome } from ".";

interface BrowserDetectorTestCase {
    statement: string;
    mockWindow: any;
    isDocument?: boolean;
    results: any;
}

describe("Util: isBrowserChrome", () => {
    const testCases: Array<BrowserDetectorTestCase> = [
        {
            statement: "Should return true when browser is chrome",
            results: true,
            mockWindow: { chrome: { webstore: {}, runtime: {} } },
        },
        {
            statement: "Should return true when browser is chrome",
            results: true,
            mockWindow: { chrome: { runtime: {} } },
        },
        {
            statement: "Should return true when browser is chrome",
            results: true,
            mockWindow: { chrome: { webstore: {} } },
        },
        {
            statement: "Should return false when browser is not chrome",
            results: false,
            mockWindow: {},
        },
        {
            statement: "Should return false when browser is not chrome",
            results: false,
            mockWindow: { chrome: {} },
        },
    ];
    testCases.map((testCase: BrowserDetectorTestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(
            testCase.mockWindow
        )} | result: ${String(testCase.results)}`, () => {
            (global as any).window = Object.create(window);
            (global as any).window = testCase.mockWindow;
            expect(isBrowserChrome()).toBe(testCase.results);
        });
    });
});
