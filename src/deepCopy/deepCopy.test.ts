import { deepCopy } from ".";

interface TestCase {
    statement: string;
    object: any;
    hash?: any;
}

describe("Util: deepCopy", () => {
    const map = new Map();
    map.set("a", "abc");
    map.set("b", new Map());

    const testCases: Array<TestCase> = [
        { statement: "able to deep clone object", object: { atr: new Date(), atr2: { level2a: 1, level2b: { level3: new RegExp("11") } } } },
        { statement: "able to deep clone object", object: new Set() },
        { statement: "able to deep clone object", object: null },
        { statement: "able to deep clone object", object: { level1: Object.create(null)} },
        { statement: "able to deep clone object", object: map },
        { statement: "return original value if variable is not object", object: "1234" }
    ];
    testCases.map((testCase: TestCase) => {
        test(`- Statement: ${testCase.statement} | params: ${JSON.stringify(testCase.object)}`, () => {
            expect(deepCopy(testCase.object, testCase.hash)).toEqual(testCase.object);
        });
    });
});
