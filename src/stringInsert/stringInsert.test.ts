import { stringInsert } from ".";

interface TestCase {
    statement: string;
    params: any;
    symbols?: string | [string, string];
    result: string;
}

describe("Util: stringInsert", () => {
    const testCases: Array<TestCase> = [
        { statement: "@vars@", params: { vars: "something" }, result: "something" },
        { statement: "The email address is something@example.com @vars@", params: { vars: "something" }, result: "The email address is something@example.com something" },
        { statement: "Et facilis @age@ aut voluptatem @value@ nostrum.", params: { age: 35, value: true }, result: "Et facilis 35 aut voluptatem true nostrum." },
        { statement: "@vars@vars@", params: { vars: "something" }, result: "somethingvars@" },
        { statement: "@vars%vars%", params: { vars: "something" }, symbols: "%", result: "@varssomething" },
        { statement: "@varslvarsl", params: { var: "something" }, symbols: "sl", result: "@varsomething" },
        { statement: "@vars", params: { vars: "something" }, result: "@vars" },
        { statement: "@vars@", params: {}, result: "@vars@" },
        { statement: "{{vars}}", params: { vars: "something" }, symbols: ["{{", "}}"], result: "something" },
        { statement: "{vars}", params: { vars: "something" }, symbols: [] as any, result: "{vars}" },
        { statement: {} as any, params: {}, result: {} as any },
    ];
    testCases.map((testCase: TestCase) => {
        test(`- Statement: ${testCase.statement} | params: ${JSON.stringify(testCase.params)} | symbol: ${testCase.symbols} | result: ${testCase.result}`, () => {
            expect(stringInsert(testCase.statement, testCase.params, testCase.symbols)).toEqual(testCase.result);
        });
    });
});
