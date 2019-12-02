import { isBrowserSafari } from "../src/isBrowserSafari";

interface BrowserDetectorTestCase {
    statement: string;
    mockWindow: any;
    isDocument?: boolean;
    results: any;
}

describe("Util: isBrowserSafari", () => {
    const testCases: Array<BrowserDetectorTestCase> = [
        {
            statement: "Should return true when browser is safari",
            results: true,
            mockWindow: { HTMLElement: "constructor" }
        },
        {
            statement: "Should return false when browser is not safari",
            results: false,
            mockWindow: { safari: { pushNotification: false } }
        },
        {
            statement: "Should return false when browser is not safari",
            results: false,
            mockWindow: { safari: undefined }
        },
        {
            statement: "Should return false when browser is not safari",
            results: false,
            mockWindow: {}
        },
    ];
    testCases.map((testCase: BrowserDetectorTestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(testCase.mockWindow)} | result: ${String(testCase.results)}`, () => {
            (global as any).window = Object.create(window);
            (global as any).window = testCase.mockWindow;
            expect(isBrowserSafari()).toBe(testCase.results);
        });
    });
});
