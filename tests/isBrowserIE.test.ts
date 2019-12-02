import { isBrowserIE } from "../src/isBrowserIE";

interface BrowserDetectorTestCase {
    statement: string;
    mockWindow: any;
    isDocument?: boolean;
    results: any;
}

describe("Util: isBrowserIE", () => {
    const testCases: Array<BrowserDetectorTestCase> = [
        {
            statement: "Should return true when browser is ie",
            results: true,
            mockWindow: { documentMode: {} }
        },
        {
            statement: "Should return false when browser is not ie",
            results: false,
            mockWindow: {}
        },
    ];
    testCases.map((testCase: BrowserDetectorTestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(testCase.mockWindow)} | result: ${String(testCase.results)}`, () => {
            (global as any).document = Object.create(document);
            (global as any).document = testCase.mockWindow;
            expect(isBrowserIE()).toBe(testCase.results);
        });
    });
});
