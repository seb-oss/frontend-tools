import { FormValidator, ValidationType, ValidationSpecs, ValidationErrors, ModelFieldError } from "../src/formValidator";
import { modifyDate } from "../src/modifyDate";
import { isEmpty } from "../src/isEmpty";

type TestCase = {
    type: ValidationType;
    value: any;
    specs?: ValidationSpecs;
    expected: ValidationErrors;
};

type CustomType = {
    subject: any;
};

describe("Form Validator", () => {
    const now: Date = new Date();
    const noError = undefined;
    describe("Testing each validation type individually", () => {
        const testCases: Array<TestCase> = [
            { type: "required", value: null, expected: "empty" },
            { type: "required", value: 2, expected: noError },
            { type: "isDate", value: null, expected: "invalidDate" },
            { type: "isDate", value: now, expected: noError },
            { type: "noWhitespace", value: " ", expected: "isWhitespace" },
            { type: "noWhitespace", value: " test ", expected: noError },
            { type: "dateRange", value: modifyDate(now, 1, "SUBTRACT", "year"), specs: { minDate: now }, expected: "beforeMinDate" },
            { type: "dateRange", value: modifyDate(now, 1, "ADD", "year"), specs: { maxDate: now }, expected: "afterMaxDate" },
            { type: "dateRange", value: now, specs: { minDate: modifyDate(now, 1, "SUBTRACT", "day"), maxDate: modifyDate(now, 1, "ADD", "day") }, expected: noError },
            { type: "dateRange", value: null, specs: { maxDate: now }, expected: "invalidDate" },
            { type: "textLength", value: true, specs: { minLength: 5 }, expected: "invalidInput" },
            { type: "textLength", value: "ABCDEFG", specs: { minLength: 5 }, expected: noError },
            { type: "textLength", value: "ABC", specs: { minLength: 5 }, expected: "lessThanMinLength" },
            { type: "textLength", value: "ABCDEFG", specs: { maxLength: 8 }, expected: noError },
            { type: "textLength", value: "ABCDEFGHIJK", specs: { maxLength: 8 }, expected: "moreThanMaxLength" },
            { type: "textLength", value: "ABCDEFG", specs: { minLength: 5, maxLength: 8 }, expected: noError },
            { type: "textLength", value: "ABC", specs: { minLength: 5, maxLength: 8 }, expected: "lessThanMinLength" },
            { type: "textLength", value: "ABCDEFGHIJK", specs: { minLength: 5, maxLength: 8 }, expected: "moreThanMaxLength" },
            { type: "valueRange", value: "TESTING", specs: { minValue: 5 }, expected: "invalidInput" },
            { type: "valueRange", value: 6, specs: { minValue: 5 }, expected: noError },
            { type: "valueRange", value: 3, specs: { minValue: 5 }, expected: "lessThanMinValue" },
            { type: "valueRange", value: 6, specs: { maxValue: 8 }, expected: noError },
            { type: "valueRange", value: 10, specs: { maxValue: 8 }, expected: "moreThanMaxValue" },
            { type: "valueRange", value: 6, specs: { minValue: 5, maxValue: 8 }, expected: noError },
            { type: "valueRange", value: 3, specs: { minValue: 5, maxValue: 8 }, expected: "lessThanMinValue" },
            { type: "valueRange", value: 10, specs: { minValue: 5, maxValue: 8 }, expected: "moreThanMaxValue" },
            { type: "validEmail", value: null, expected: "invalidEmail" },
            { type: "validEmail", value: "abc@email", expected: "invalidEmail" },
            { type: "validEmail", value: "abcdefg", expected: "invalidEmail" },
            { type: "validEmail", value: "abcdefg@site.c", expected: "invalidEmail" },
            { type: "validEmail", value: "abc@email.com", expected: noError },
            { type: "strongPassword", value: "123", expected: "weakPassword" },
            { type: "strongPassword", value: "RYGc1tc7C6nyjzz", expected: noError },
            { type: "isPhoneNumber", value: "5465", expected: "invalidPhoneNumber" },
            { type: "isPhoneNumber", value: "0123549874", expected: noError },
        ];

        testCases.map((testCase: TestCase) => {
            let title: string = `- ${testCase.type} - Expected Error: (${testCase.expected})`;
            title += ` | Value(${Object(testCase.value) !== testCase.value ? testCase.value : JSON.stringify(testCase.value)})`;
            title += !isEmpty(testCase.specs) ? ` | Specs(${JSON.stringify(testCase.specs)})` : "";
            title += ` | Expected Error(${testCase.expected})`;
            test(title, () => {
                const validator: FormValidator<CustomType> = new FormValidator<CustomType>({ subject: testCase.value })
                    .addValidation(["subject"], testCase.type as any, testCase.specs as any)
                    .validate();
                const error: ModelFieldError = validator.getError("subject");
                if (testCase.expected) {
                    expect(error ? error.errorCode : error).toEqual(testCase.expected);
                } else {
                    expect(error).not.toBeDefined();
                }
            });
        });
    });
});
