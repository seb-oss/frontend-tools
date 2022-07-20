import { capitalize } from ".";

interface TestCase {
    statement: string;
    text: string | Date;
    result: string;
}

describe("Util: capitalize", () => {
    const testCases: Array<TestCase> = [
        { statement: `able to convert a word`, text: "abc", result: "Abc" },
        {
            statement: `able to convert a sentence`,
            text: "abc is abc is abc is abc is abc",
            result: "Abc is abc is abc is abc is abc",
        },
    ];
    testCases.map((testCase: TestCase) => {
        test(`- Statement: ${testCase.statement} | string: ${testCase.text} | result: ${testCase.result}`, () => {
            expect(capitalize(testCase.text as string)).toEqual(
                testCase.result
            );
        });
    });
});
