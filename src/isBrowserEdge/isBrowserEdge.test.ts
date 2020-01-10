import { isBrowserEdge } from ".";

interface BrowserDetectorTestCase {
    statement: string;
    mockWindow: any;
    isDocument?: boolean;
    results: any;
}

describe("Util: isBrowserEdge", () => {
    const testCases: Array<BrowserDetectorTestCase> = [
        {
            statement: "Should return true when browser is edge",
            results: true,
            mockWindow: { isIE: false, StyleMedia: {} }
        },
        {
            statement: "Should return false when browser is not edge",
            results: false,
            mockWindow: { isIE: true }
        },
        {
            statement: "Should return false when browser is not edge",
            results: false,
            mockWindow: { isIE: true, StyleMedia: {} }
        },
    ];
    testCases.map((testCase: BrowserDetectorTestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(testCase.mockWindow)} | result: ${String(testCase.results)}`, () => {
            (global as any).window = Object.create(window);
            (global as any).window = testCase.mockWindow;
            expect(isBrowserEdge()).toBe(testCase.results);
        });
    });
});
