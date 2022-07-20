import { isBrowserFirefox } from ".";

interface BrowserDetectorTestCase {
    statement: string;
    mockWindow: any;
    isDocument?: boolean;
    results: any;
}

describe("Util: isBrowserFirefox", () => {
    const testCases: Array<BrowserDetectorTestCase> = [
        {
            statement: "Should return true when browser is firefox",
            results: true,
            mockWindow: { InstallTrigger: true },
        },
        {
            statement: "Should return false when browser is not firefox",
            results: false,
            mockWindow: {},
        },
    ];
    testCases.map((testCase: BrowserDetectorTestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(
            testCase.mockWindow
        )} | result: ${String(testCase.results)}`, () => {
            (global as any).window = Object.create(window);
            (global as any).window = testCase.mockWindow;
            expect(isBrowserFirefox()).toBe(testCase.results);
        });
    });
});
