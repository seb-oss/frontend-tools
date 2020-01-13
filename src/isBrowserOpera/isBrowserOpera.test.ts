import { isBrowserOpera } from ".";

interface BrowserDetectorTestCase {
    statement: string;
    mockWindow: any;
    isDocument?: boolean;
    results: any;
}

describe("Util: isBrowserOpera", () => {
    const testCases: Array<BrowserDetectorTestCase> = [
        {
            statement: "Should return true when browser is opera",
            results: true,
            mockWindow: { opr: { addons: {} } }
        },
        {
            statement: "Should return true when browser is opera",
            results: true,
            mockWindow: { opera: {} }
        },
        {
            statement: "Should return false when browser is not opera",
            results: false,
            mockWindow: {}
        },
    ];
    testCases.map((testCase: BrowserDetectorTestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(testCase.mockWindow)} | result: ${String(testCase.results)}`, () => {
            (global as any).window = Object.create(window);
            (global as any).window = testCase.mockWindow;
            expect(isBrowserOpera()).toBe(testCase.results);
        });
    });
});
