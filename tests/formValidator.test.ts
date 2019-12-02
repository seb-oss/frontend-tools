import { FormValidator, ValidationType, ValidationSpecs, ModelFieldError } from "../src/formValidator";
import { modifyDate } from "../src/modifyDate";
import { isEmpty } from "../src/isEmpty";

type TestCase = {
    type: ValidationType;
    value: any;
    specs?: ValidationSpecs;
    expected: ModelFieldError;
};

type CustomType = {
    subject: any;
};

describe("Form Validator", () => {
    const now: Date = new Date();
    const noError = undefined;
    describe("Testing each validation type individually", () => {
        const testCases: Array<TestCase> = [
            { type: "required", value: null, expected: { errorCode: "empty" } },
            { type: "required", value: 2, expected: noError },
            { type: "isDate", value: null, expected: { errorCode: "invalidDate" } },
            { type: "isDate", value: now, expected: noError },
            { type: "noWhitespace", value: " ", expected: { errorCode: "isWhitespace" } },
            { type: "noWhitespace", value: " test ", expected: noError },
            { type: "dateRange", value: modifyDate(now, 1, "SUBTRACT", "year"), specs: { minDate: now }, expected: { errorCode: "beforeMinDate", specs: { minDate: now } } },
            { type: "dateRange", value: modifyDate(now, 1, "ADD", "year"), specs: { maxDate: now }, expected: { errorCode: "afterMaxDate", specs: { maxDate: now } } },
            { type: "dateRange", value: now, specs: { minDate: modifyDate(now, 1, "SUBTRACT", "day"), maxDate: modifyDate(now, 1, "ADD", "day") }, expected: noError },
            { type: "dateRange", value: null, specs: { maxDate: now }, expected: { errorCode: "invalidDate" } },
            { type: "textLength", value: true, specs: { minLength: 5 }, expected: { errorCode: "invalidInput" } },
            { type: "textLength", value: "ABCDEFG", specs: { minLength: 5 }, expected: noError },
            { type: "textLength", value: "ABC", specs: { minLength: 5 }, expected: { errorCode: "lessThanMinLength", specs: { minLength: 5 } } },
            { type: "textLength", value: "ABCDEFG", specs: { maxLength: 8 }, expected: noError },
            { type: "textLength", value: "ABCDEFGHIJK", specs: { maxLength: 8 }, expected: { errorCode: "moreThanMaxLength", specs: { maxLength: 8 } } },
            { type: "textLength", value: "ABCDEFG", specs: { minLength: 5, maxLength: 8 }, expected: noError },
            { type: "textLength", value: "ABC", specs: { minLength: 5, maxLength: 8 }, expected: { errorCode: "lessThanMinLength", specs: { minLength: 5 } } },
            { type: "textLength", value: "ABCDEFGHIJK", specs: { minLength: 5, maxLength: 8 }, expected: { errorCode: "moreThanMaxLength", specs: { maxLength: 8 } } },
            { type: "valueRange", value: "TESTING", specs: { minValue: 5 }, expected: { errorCode: "invalidInput" } },
            { type: "valueRange", value: 6, specs: { minValue: 5 }, expected: noError },
            { type: "valueRange", value: 3, specs: { minValue: 5 }, expected: { errorCode: "lessThanMinValue", specs: { minValue: 5 } } },
            { type: "valueRange", value: 6, specs: { maxValue: 8 }, expected: noError },
            { type: "valueRange", value: 10, specs: { maxValue: 8 }, expected: { errorCode: "moreThanMaxValue", specs: { maxValue: 8 } } },
            { type: "valueRange", value: 6, specs: { minValue: 5, maxValue: 8 }, expected: noError },
            { type: "valueRange", value: 3, specs: { minValue: 5, maxValue: 8 }, expected: { errorCode: "lessThanMinValue", specs: { minValue: 5 } } },
            { type: "valueRange", value: 10, specs: { minValue: 5, maxValue: 8 }, expected: { errorCode: "moreThanMaxValue", specs: { maxValue: 8 } } },
            { type: "validEmail", value: null, expected: { errorCode: "invalidEmail" } },
            { type: "validEmail", value: "abc@email", expected: { errorCode: "invalidEmail" } },
            { type: "validEmail", value: "abcdefg", expected: { errorCode: "invalidEmail" } },
            { type: "validEmail", value: "abcdefg@site.c", expected: { errorCode: "invalidEmail" } },
            { type: "validEmail", value: "abc@email.com", expected: noError },
            { type: "strongPassword", value: "123", expected: { errorCode: "weakPassword" } },
            { type: "strongPassword", value: "RYGc1tc7C6nyjzz", expected: noError },
            { type: "isPhoneNumber", value: "5465", expected: { errorCode: "invalidPhoneNumber" } },
            { type: "isPhoneNumber", value: "0123549874", expected: noError },
        ];

        testCases.map((testCase: TestCase) => {
            let title: string = `- ${testCase.type}`;
            title += ` | Value(${Object(testCase.value) !== testCase.value ? testCase.value : JSON.stringify(testCase.value)})`;
            title += !isEmpty(testCase.specs) ? ` | Specs(${JSON.stringify(testCase.specs)})` : "";
            title += ` | Expected Error(${JSON.stringify(testCase.expected)})`;
            test(title, () => {
                const validator: FormValidator<CustomType> = new FormValidator<CustomType>({ subject: testCase.value })
                    .addValidation(["subject"], testCase.type as any, testCase.specs as any)
                    .validate();
                const error: ModelFieldError = validator.getError("subject");
                if (testCase.expected) {
                    expect(error).toMatchObject(testCase.expected);
                } else {
                    expect(error).not.toBeDefined();
                }
            });
        });
    });
});
