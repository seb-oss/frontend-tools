import { FormValidator, ValidationType, ValidationSpecs, ModelFieldError, ModelErrors } from "../src/formValidator";
import { modifyDate } from "../src/modifyDate";
import { isEmpty } from "../src/isEmpty";

type TestCase1 = {
    type: ValidationType;
    value: any;
    specs?: ValidationSpecs;
    expected: ModelFieldError;
};

type TestCase2 = {
    fields: Array<keyof CustomType>;
    type: ValidationType;
    title: string;
};

type CustomType = {
    typeAny?: any;
    first?: number;
    second?: number;
};

describe("Form Validator", () => {
    const now: Date = new Date();
    const noError = undefined;
    describe("Testing each validation type individually", () => {
        const testCases: Array<TestCase1> = [
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

        testCases.map((testCase: TestCase1) => {
            let title: string = `- ${testCase.type}`;
            title += ` | Value(${Object(testCase.value) !== testCase.value ? testCase.value : JSON.stringify(testCase.value)})`;
            title += !isEmpty(testCase.specs) ? ` | Specs(${JSON.stringify(testCase.specs)})` : "";
            title += ` | Expected Error(${JSON.stringify(testCase.expected)})`;
            test(title, () => {
                const validator: FormValidator<CustomType> = new FormValidator<CustomType>({ typeAny: testCase.value })
                    .addValidation(["typeAny"], testCase.type as any, testCase.specs as any)
                    .validate();
                const expectedErrors: ModelErrors<CustomType> = { typeAny: testCase.expected };
                if (testCase.expected) {
                    expect(validator.getErrors()).toMatchObject(expectedErrors);
                } else {
                    expect(Object.keys(validator.getErrors()).length).toEqual(0); // no errors
                }
            });
        });
    });

    it("Should allow passing a custom validator", () => {
        const expectedErrors: ModelErrors<CustomType> = { first: { errorCode: "moreThanMaxValue" } };
        const validator: FormValidator<CustomType> = new FormValidator<CustomType>({ first: 123, second: 100 })
            .addCustomValidation(["first", "second"], ["first"], (model: CustomType): ModelFieldError => {
                if (model.first > model.second) {
                    return expectedErrors.first;
                } else {
                    return null;
                }
            }).validate();
        expect(validator.getErrors()).toMatchObject(expectedErrors);
    });

    it("Should run normal validations before custom validation", () => {
        const expectedNormalErrors: ModelErrors<CustomType> = { first: { errorCode: "lessThanMinValue" } };
        const expectedCustomErrors: ModelErrors<CustomType> = { first: { errorCode: "moreThanMaxValue" } };
        const validator: FormValidator<CustomType> = new FormValidator<CustomType>({ first: 123, second: 100 })
            .addValidation(["first"], "valueRange", { minValue: 1000 })
            .addCustomValidation(["first", "second"], ["first"], (model: CustomType): ModelFieldError => {
                if (model.first > model.second) {
                    return expectedCustomErrors.first;
                } else {
                    return null;
                }
            }).validate();
        expect(validator.getErrors()).toMatchObject(expectedNormalErrors);
    });

    describe("Should not add validation if wrong parameters are passed", () => {
        const testCases: Array<TestCase2> = [
            { title: "Wrong validation type", fields: ["first"], type: "TEST" as any },
            { title: "Wrong field name", fields: ["TEST" as any], type: "required" },
            { title: "No fields passed", fields: [], type: "required" },
        ];
        testCases.map((testCase: TestCase2) => {
            test(testCase.title, () => {
                const validator: FormValidator<CustomType> = new FormValidator<CustomType>({ first: 123, second: 100 })
                    .addValidation(testCase.fields, testCase.type as any)
                    .validate();
                expect(validator.getErrors()).toEqual({});
            });
        });
    });

    describe("Should not add custom validation if wrong parameters are passed", () => {
        const testCases: Array<TestCase2> = [
            { title: "Wrong field name", fields: ["TEST" as any], type: "required" },
            { title: "No fields passed", fields: [], type: "required" },
        ];
        testCases.map((testCase: TestCase2) => {
            test(testCase.title, () => {
                const validator: FormValidator<CustomType> = new FormValidator<CustomType>({ first: 123, second: 100 })
                    .addCustomValidation(testCase.fields, testCase.fields, () => ({ errorCode: "afterMaxDate" }))
                    .validate();
                expect(validator.getErrors()).toEqual({});
            });
        });
    });

    it("Should proceed to the next validation if the first one doesn't return an error", () => {
        const validator: FormValidator<CustomType> = new FormValidator<CustomType>({ typeAny: "ABCD" })
            .addValidation(["typeAny"], "required")
            .addValidation(["typeAny"], "textLength", { minLength: 5 })
            .validate();
        const expectedErrors: ModelErrors<CustomType> = { typeAny: { errorCode: "lessThanMinLength", specs: { minLength: 5 } } };
        expect(validator.getErrors()).toMatchObject(expectedErrors);
    });

    describe("Should not store the form model if it's invalid", () => {
        test("Empty object", () => {
            expect(new FormValidator<CustomType>({}).validate().getErrors()).toMatchObject({});
        });
        test("Non object", () => {
            expect(new FormValidator<CustomType>([] as any).validate().getErrors()).toMatchObject({});
        });
    });
});
