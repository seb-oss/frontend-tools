import { arrayToObject } from "../src/arrayToObject";

interface TestCase {
    statement: string;
    results: any;
    params: {
        array: Array<any>;
        key?: string;
    };
}
describe("Util: arrayToObject", () => {
    const testCases: Array<TestCase> = [
        {
            statement: "Should convert array to object",
            params: { array: ["first", "second", "third"], key: "key"},
            results: { key0: "first", key1: "second", key2: "third"}
        },
        {
            statement: "Should convert array to object",
            params: { array: [1, 2, 3]},
            results: { 0: 1, 1: 2, 2: 3}
        }
    ];
    testCases.map((testCase: TestCase) => {
        it(`${testCase.statement} | params: ${JSON.stringify(testCase.params)} | result: ${JSON.stringify(testCase.results)}`, () => {
            expect(arrayToObject(testCase.params.array, testCase.params.key)).toEqual(testCase.results);
        });
    });
});
