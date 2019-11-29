import moment, { Moment } from "moment";
import { isEmpty } from "./isEmpty";
import { isPhoneNumber } from "./isPhoneNumber";
import { isEmail } from "./isEmail";
import { checkStringLength } from "./checkStringLength";
import { deepCopy } from "./deepCopy";

export type ValidationSpecs = {
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
    minDate?: Date | Moment;
    maxDate?: Date | Moment;
};

export type ModelFieldError = {
    errorCode: string;
    spec: ValidationSpecs;
};

export type ModelErrors<T> = { [K in keyof T]?: ModelFieldError; };
type ValidationType = "required" | "isDate" | "noWhitespace" | "dateRange" | "textLength" | "validEmail" | "strongPassword";
export type FormFieldTypes = "date" | "string" | "number" | "array" | "object";

type ExtraValidator<T> = Object & {
    fields: Array<keyof T>;
    validate: (...valuesOfFields) => string;
    errorFields: Array<keyof T>;
};

class ValidatorModelItem<T> extends Object {
    name: keyof T;
    value: any = null;
    specs: ValidationSpecs = {};
    validations: Array<ValidationType> = [];
    extraValidators: Array<any> = [];

    constructor(name: keyof T, value: any) {
        super();
        if (name && typeof name === "string") {
            this.name = name;
            this.value = value;
        }
    }
}

class FormModel<T> extends Object {
    constructor(model: T) {
        super();
        if (!isEmpty(model) && typeof model === "object") {
            const clone: T = deepCopy<T>(model);
            for (const field in clone) {
                this[field as string] = new ValidatorModelItem<T>(field, clone[field]);
            }
        }
    }

    addValidation(name: string, type: ValidationType, specs?: ValidationSpecs): FormModel<T> {
        if ((this[name] as ValidatorModelItem<T>).validations.indexOf(type) !== -1) {
            (this[name] as ValidatorModelItem<T>).validations.push(type);
        }
        return this;
    }
}

export class FormValidator<T> {
    private extraValidators: Array<ExtraValidator<T>> = [];
    private formObject: FormModel<T> = {};
    private errors: ModelErrors<T> = {};

    constructor(formObject: T) {
        this.formObject = new FormModel<T>(formObject);
    }

    addValidation(fields: Array<keyof T> | ["ALL"], type: ValidationType, specs?: ValidationSpecs): FormValidator<T> {
        if (fields && fields instanceof Array && type && typeof type === "string" && this.isValidType(type)) {
            if (fields.length) {
                (fields as Array<keyof T>).map((field: keyof T) => {
                    if (this.formObject.hasOwnProperty(field)) {
                        this.formObject[field as string].validations.push(type);
                        this.formObject[field as string].specs = { ...this.formObject[field as string].specs, ...specs };
                    }
                });
            } else if (fields && fields.length === 1 && fields[0] === "ALL") { // Means all field
                for (const field in this.formObject) {
                    this.formObject[field as string].validations.push(type);
                }
            }
        }
        return this;
    }

    /**
     * Add a custom validator that returns an error message if found
     * @param {Array<string>} fields The fields to be validated
     * @param {Array<string>} errorFields The fields where the error is reported to
     * @param {function} validator The validator method
     * @returns {FormValidator} The form validator object
     * @example addValidator(["balance", "payment"], ["payment"], (balance: number, payment: number) => { return payment > balance ? "The payment exceeds your balance" : null; });
     */
    addCustomValidator(fields: Array<keyof T>, errorFields: Array<keyof T>, validator: (...params: Array<any>) => string): FormValidator<T> {
        if (fields && fields.length && errorFields && errorFields.length && validator) {
            const extraValidatorIndex: number = this.extraValidators.push({
                fields: fields,
                validate: validator,
                errorFields: errorFields
            });
        }
        return this;
    }

    /**
     * Get the error found in the form object. Has to be called after `validate` method has been called.
     * @returns {any} The form object object populated by validation errors, if found any. Otherwise, it's an empty object.
     */
    getErrors: () => any = () => this.errors;

    /**
     * Get a specific error found during validation, if any. Has to be called after `validate` method has been called.
     * @returns {any} The error of the specific item in the form, if any.
     */
    getError: (name: string) => any = (name: string) => this.errors[name];

    /**
     * Validates the form object passed in the constructor
     * @returns {FormValidator} The form validator object
     */
    validate(): FormValidator<T> {
        for (const field in this.formObject) {
            const modelItem: ValidatorModelItem<T> = this.formObject[field];
            modelItem.validations.map((type: ValidationType) => {
                const modelFieldError: ModelFieldError = this.validateField(modelItem.value, type);
                if (!isEmpty(modelFieldError)) {
                    this.errors[field] = modelFieldError;
                }
            });
        }

        if (this.extraValidators.length) {
            this.extraValidators.map((extraValidator: ExtraValidator<T>) => {
                const valuesOfFields: Array<any> = [];
                extraValidator.fields.map((field: keyof T) => {
                    if (this.formObject.hasOwnProperty(field)) {
                        valuesOfFields.push(this.formObject[field].value);
                    }
                });
                const extraValidatorError: string = extraValidator.validate(...valuesOfFields);
                extraValidator.errorFields.map((field: keyof T) => {
                    if (this.formObject.hasOwnProperty(field) && !this.errors[field]) {
                        (extraValidatorError) && (this.errors[field] = extraValidatorError);
                    }
                });
            });
        }
        return this;
    }

    private isValidType(type: ValidationType): boolean {
        return ["required", "isDate", "noWhitespace", "dateRange", "textLength", "validEmail", "strongPassword"].indexOf(type) !== -1;
    }

    /**
     * Validate a parameter in the form formObject based on predefined set of criteria
     * @param {ValidatorModelItem} fieldObject The field object stored in the local formObject
     * @returns {string} The error found in the parameter
     */
    private validateField(value: any, type: ValidationType): ModelFieldError {
        switch (type) {
            case "required": break;
            case "isDate": break;
            case "noWhitespace": break;
            case "dateRange": break;
            case "textLength": break;
            case "validEmail": break;
            case "strongPassword": break;
        }
        let i: number = 0;
        let error: string = null;
        if (fieldObject.criteria && fieldObject.criteria.length) {
            do {
                switch (fieldObject.criteria[i]) {
                    // Ordered by priority, stops as soon as it catches an error
                    case validateTypes.isEmpty: error = isEmpty(fieldObject.value) ? ErrorTypes.EMPTY : error; break;
                    case validateTypes.validPhoneNumber: error = isPhoneNumber(fieldObject.value) ? error : ErrorTypes.INVALID_PHONE_NUMBER; break;
                    case validateTypes.validEmail: error = (!isEmpty(fieldObject.value) && !isEmail(fieldObject.value)) ? ErrorTypes.INVALID_EMAIL : error; break;
                    case validateTypes.noWhitespace: error = (!isEmpty(fieldObject.value) && fieldObject.value.trim && fieldObject.value.trim() === "") ? ErrorTypes.NO_WHITESPACE : error; break;
                    case validateTypes.isDate:
                        const date: Date = moment(fieldObject.value).toDate();
                        if (
                            (// Not object type date
                                !isEmpty(date) &&
                                !(date instanceof Date)
                            ) || (// Invalid date
                                (date as Date).getTime &&
                                isNaN((date as Date).getTime())
                            )
                        ) {
                            error = ErrorTypes.INVALID_DATE;
                        }
                        break;
                    case validateTypes.noFuture:
                        if (!isEmpty(fieldObject.value)) {
                            error = new Date(fieldObject.value) > new Date() ? ErrorTypes.NO_FUTURE_DATE : error;
                        }
                        break;
                    case validateTypes.textRange:
                        if (fieldObject.value) {
                            error = !checkStringLength(fieldObject.value, fieldObject.specs.min, fieldObject.specs.max)
                                ? ErrorTypes.WRONG_LIMIT.replace("%min", String(fieldObject.specs.min)).replace("%max", String(fieldObject.specs.max))
                                : error;
                        }
                        break;
                    case validateTypes.minValue:
                        if (fieldObject.value.toString()) {
                            error = fieldObject.value < fieldObject.specs.min
                                ? ErrorTypes.WRONG_MIN_VALUE.replace("%min", String(fieldObject.specs.min))
                                : error;
                        }
                        break;
                    case validateTypes.maxValue:
                        if (fieldObject.value.toString()) {
                            error = fieldObject.value > fieldObject.specs.max
                                ? ErrorTypes.WRONG_MAX_VALUE.replace("%max", String(fieldObject.specs.max))
                                : error;
                        }
                        break;
                    default:
                        console.error(`Uncaught validation criteria passed with ${fieldObject.name} - Criteria: `, fieldObject.criteria[i]);
                }
                i++;
            } while (i < fieldObject.criteria.length && !error);
        }
        return error;
    }
}

/**
 * The error types that might be found in the employee formObject during validations
 * @member EMPTY
 * @member NO_WHITESPACE
 * @member NO_FUTURE_DATE
 * @member INVALID_DATE
 * @member WRONG_LIMIT
 * @member INVALID_INPUT
 * @member WRONG_MIN_VALUE
 */
const enum ErrorTypes {
    /** The field is empty */
    EMPTY = "Mandatory",
    /** The field is a single or a group of whitespaces */
    NO_WHITESPACE = "Cannot be white space",
    /** The date provided is set in the future */
    NO_FUTURE_DATE = "Date should not be in the future",
    /** Invalid date format */
    INVALID_DATE = "Invalid date",
    /** Not within the specified limit */
    WRONG_LIMIT = "Must be between %min and %max characters long",
    /** invalid input in general */
    INVALID_INPUT = "Invalid input",
    /** invalid input in general */
    INVALID_EMAIL = "Invalid Email format",
    /** Superior to minimum value */
    WRONG_MIN_VALUE = "Must be at least %min",
    /** maximum value  */
    WRONG_MAX_VALUE = "Amount should not exceed %max",
    /** invalid phone number */
    INVALID_PHONE_NUMBER = "Invalid phone number"
}
