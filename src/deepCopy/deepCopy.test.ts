import { deepCopy } from ".";

interface TestCase {
    statement: string;
    object: any;
}

describe("Util: deepCopy", () => {
    const map = new Map();
    map.set("a", "abc");
    map.set("b", new Map());

    // Cyclic reference
    function A() {
        /** empty */
    }
    function B() {
        /** empty */
    }
    const a = new A();
    const b = new B();
    a.b = b;
    b.a = a;

    const testCases: Array<TestCase> = [
        {
            statement: "An object with date object and multi-level",
            object: {
                atr: new Date(),
                atr2: { level2a: 1, level2b: { level3: new RegExp("11") } },
            },
        },
        { statement: "A setter object", object: new Set() },
        { statement: "null", object: null },
        {
            statement: "An object constructor",
            object: { level1: Object.create(null) },
        },
        { statement: "A Map object", object: map },
        { statement: "Primitive type", object: "1234" },
        { statement: "Cyclic reference", object: a },
        {
            statement: "Symbol",
            object: { level1: Symbol(123), level2: Object.create(null) },
        },
    ];
    testCases.map((testCase: TestCase) => {
        test(`- ${testCase.statement}`, () => {
            expect(deepCopy(testCase.object)).toEqual(testCase.object);
        });
    });
});
