import { isSameObject } from ".";

interface ComparisonTestCase {
    statement: string;
    objectA: any;
    objectB: any;
    isDeep?: boolean;
    result: boolean;
}

describe("Util: isSameObject", () => {
    const testCases: Array<ComparisonTestCase> = [
        {
            statement: "should return true for same object for deep comparison",
            objectA: { atr: 1, atr2: "123" },
            objectB: { atr: 1, atr2: "123" },
            isDeep: true,
            result: true
        },
        {
            statement: "should return false for different objects for deep comparison",
            objectA: { atr: 1, atr2: 123 },
            objectB: { atr: 1, atr2: "123" },
            isDeep: true,
            result: false
        },
        {
            statement: "should return false for different objects for deep comparison",
            objectA: { atr: 1, atr2: 123 },
            objectB: { atr: 1 },
            isDeep: true,
            result: false
        },
        {
            statement: "should return false for same object for shallow comparison when attribute is not in order",
            objectA: { atr: 1, atr2: { level2a: 1, level2b: { level3: 123 } } },
            objectB: { atr: 1, atr2: { level2b: { level3: 123 }, level2a: 1 } },
            result: false
        },
        {
            statement: "should return true for same object for shallow comparison when objects are exactly the same",
            objectA: { atr: 1, atr2: { level2a: 1, level2b: { level3: 123 } } },
            objectB: { atr: 1, atr2: { level2a: 1, level2b: { level3: 123 } } },
            result: true
        },
    ];
    testCases.map((testCase: ComparisonTestCase) => {
        test(`- Statement: ${testCase.statement} | objectA: ${JSON.stringify(testCase.objectA)} | objectB: ${JSON.stringify(testCase.objectB)}`, () => {
            expect(isSameObject(testCase.objectA, testCase.objectB, testCase.isDeep)).toEqual(testCase.result);
        });
    });
});
