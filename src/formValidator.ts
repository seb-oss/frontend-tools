import moment from "moment";
import { isEmpty } from "./isEmpty";
import { isPhoneNumber } from "./isPhoneNumber";
import { isEmail } from "./isEmail";
import { Logger, LoggerOptions } from "./logger";
import { checkStringLength } from "./checkStringLength";

interface AttributeMapItem {
    name: string;
    type: string;
}

interface ValidatorModelItem {
    name: string;
    value: any;
    type?: string;
    required?: boolean;
    allowFutureDates?: boolean;
    validEmail?: boolean;
    limitLength?: boolean;
    minValue?: boolean;
    maxValue?: boolean;
    specs?: { min?: number, max?: number };
    extraValidators?: Array<string>;
    criteria?: Array<validateTypes>;
}

interface FormModel {
    [index: string]: ValidatorModelItem;
}

interface FormErrors {
    [index: string]: string | Array<{ [index: string]: string }>;
}

interface ExtraValidator {
    fields: Array<string>;
    validate: (...valuesOfFields) => string;
    errorFields: Array<string>;
}

export class FormValidator {
    private extraValidators: Array<ExtraValidator> = [];
    private logger: Logger = new Logger("Form Validator");
    private formObject: FormModel = {};
    private errors: FormErrors = {};

    /**
     * Validates values captured in form fields and stored to a formObject
     * @param {any} formObject The formObject to be validated
     */
    constructor(formObject: any) {
        this.storeFormObject(formObject);
    }

    /**
     * Defined the type of the fields in the formObject
     * @param {Array<string>} fields The fields needed to be defined
     * @param {FormFieldTypes} type The type of the fields passed
     * @returns {FormValidator} The form validator object
     */
    defineTypes(fields: Array<string>, type: FormFieldTypes): FormValidator {
        const methodLog: Array<any> = [];
        if (fields && fields.length) {
            fields.map((field: string) => {
                if (this.formObject.hasOwnProperty(field)) {
                    this.formObject[field].type = type;
                    methodLog.push(this.formObject[field]);
                }
            });
            this.logger.insert("defineTypes", `Define types for ${methodLog.length} fields`, methodLog.length ? methodLog : { params: { fields, type } });
        } else {
            this.logger.insert("defineTypes", "Invalid params passed", { fields, type });
        }
        return this;
    }

    /**
     * Defined the type of the fields in the formObject base on a keyword in the field name
     * @param {string} keyword The keyword found in the field name
     * @param {FormFieldTypes} type The type of the fields matching the keyword
     * @returns {FormValidator} The form validator object
     * @example `defineTypesByKeyword("Id", FormFieldTypes.NUMBER)` will select fields like `userId` and `optionId`
     */
    defineTypesByKeyword(keyword: string, type: FormFieldTypes): FormValidator {
        const methodLog: Array<any> = [];
        if (keyword && type) {
            for (const field in this.formObject) {
                if (field.indexOf(keyword) !== -1) {
                    this.formObject[field].type = type;
                    methodLog.push(this.formObject[field]);
                }
            }
            this.logger.insert("defineTypesByKeyword", `Define types for ${methodLog.length} fields`, methodLog.length ? methodLog : { params: { keyword, type } });
        } else {
            this.logger.insert("defineTypesByKeyword", "Invalid params passed", { keyword, type });
        }
        return this;
    }

    /**
     * Define the type of the fields in the form object using an attribute map array
     * @param {Array<AttributeMapItem>} attributeMap An array of each attribute with its type
     * @description An attribute map is an array of objects where each object has two parameters: `name` and `type`.
     * The attribute map is used to map the types of each field.
     * @returns {FormValidator} The form validator object
     */
    defineTypesByAttributeMap(attributeMap: Array<AttributeMapItem>): FormValidator {
        const methodLog: Array<any> = [];
        if (attributeMap && attributeMap.length) {
            attributeMap.map((item: AttributeMapItem) => {
                if (this.formObject.hasOwnProperty(item.name)) {
                    this.formObject[item.name].type = item.type;
                    methodLog.push(this.formObject[item.name]);
                }
            });
            this.logger.insert("defineTypesByAttributeMap", `Defined types for ${methodLog.length} fields`, methodLog.length ? methodLog : { params: { attributeMap } });
        } else {
            this.logger.insert("defineTypesByAttributeMap", "Invalid params passed", { attributeMap });
        }
        return this;
    }

    /**
     * Define the type of specific fields in an array of objects in the form object
     * @param {string} arrayParameterName The name of the parameter that contains the array
     * @param {Array<string>} fields The fields in the array parameter needed to be defined
     * @param {string} type The type of the fields
     * @returns {FormValidator} The form validator object
     */
    defineArrayOfObjects(arrayParameterName: string, fields: Array<string>, type: string): FormValidator {
        const methodLog: Array<any> = [];
        if (arrayParameterName && fields && fields.length && type) {
            if (this.formObject.hasOwnProperty(arrayParameterName) && this.formObject[arrayParameterName].value) {
                (this.formObject[arrayParameterName].value as Array<any>).map((item: FormModel) => {
                    fields.map((field: string) => {
                        if (item.hasOwnProperty(field)) {
                            item[field].type = type;
                            methodLog.push(item[field]);
                        }
                    });
                });
            }
            this.logger.insert("defineArrayOfObjects", `Defined types for ${methodLog.length} fields`, methodLog.length ? methodLog : { params: { arrayParameterName, fields, type } });
        } else {
            this.logger.insert("defineArrayOfObjects", "Invalid params passed", { arrayParameterName, fields, type });
        }
        return this;
    }

    /**
     * Define the type of specific fields in an array of objects in the form object
     * @param {string} arrayParameterName The name of the parameter that contains the array
     * @param {Array<AttributeMapItem>} attributeMap An array of each attribute with its type
     * @description An attribute map is an array of objects where each object has two parameters: `name` and `type`.
     * The attribute map is used to map the types of each field.
     * @returns {FormValidator} The form validator object
     */
    defineArrayOfObjectByAttributeMap(arrayParameterName: string, attributeMap: Array<AttributeMapItem>): FormValidator {
        const methodLog: Array<any> = [];
        if (arrayParameterName && attributeMap) {
            if (
                this.formObject.hasOwnProperty(arrayParameterName)
                && this.formObject[arrayParameterName].value
                && (this.formObject[arrayParameterName].value instanceof Array)
            ) {
                (this.formObject[arrayParameterName].value as Array<any>).map((item: FormModel) => {
                    attributeMap.map((attributeMapItem: AttributeMapItem) => {
                        if (item.hasOwnProperty(attributeMapItem.name)) {
                            item[attributeMapItem.name].type = attributeMapItem.type;
                            methodLog.push(item[attributeMapItem.name]);
                        }
                    });
                });
            }
            this.logger.insert("defineArrayOfObjectByAttributeMap", `Defined types for ${methodLog.length} fields`, methodLog.length ? methodLog : { params: { arrayParameterName, attributeMap } });
        } else {
            this.logger.insert("defineArrayOfObjectByAttributeMap", "Invalid params passed", { arrayParameterName, attributeMap });
        }
        return this;
    }

    /**
     * Define an object in the form model
     * @param {string} objectParameterName Object name
     * @param {Array<string>} fields The fields in the object needed to be defined
     * @param {string} type The type of the fields specified
     * @returns {FormValidator} The form validator object
     */
    defineObject(objectParameterName: string, fields: Array<string>, type: string): FormValidator {
        const methodLog: Array<any> = [];
        if (objectParameterName && fields && type) {
            if (this.formObject.hasOwnProperty(objectParameterName)) {
                fields.map((field: string) => {
                    const objectItem: ValidatorModelItem = {
                        name: field,
                        type: type,
                        value: null
                    };
                    if (this.formObject[objectParameterName].value) {
                        if (this.formObject[objectParameterName].value.hasOwnProperty(field)) {
                            objectItem.value = this.formObject[objectParameterName].value[field];
                        }
                        this.formObject[objectParameterName].value[field] = objectItem;
                    } else {
                        this.formObject[objectParameterName].value = { [field]: objectItem };
                    }
                    methodLog.push(this.formObject[objectParameterName].value[field]);
                });
            }
            this.logger.insert("defineObject", `Defined types for ${methodLog.length} fields`, methodLog.length ? methodLog : { params: { objectParameterName, fields, type } });
        } else {
            this.logger.insert("defineObject", "Invalid params passed", { objectParameterName, fields, type });
        }
        return this;
    }

    /**
     * Define an object in the form model using the attribute map
     * @param {string} objectParameterName Object name
     * @param {Array<AttributeMapItem>} attributeMap An array of each attribute with its type
     * @returns {FormValidator} The form validator object
     */
    defineObjectByAttributeMap(objectParameterName: string, attributeMap: Array<AttributeMapItem>): FormValidator {
        const methodLog: Array<any> = [];
        if (objectParameterName && attributeMap) {
            if (this.formObject.hasOwnProperty(objectParameterName)) {
                attributeMap.map((objectItem: AttributeMapItem) => {
                    if (this.formObject[objectParameterName].value && this.formObject[objectParameterName].value.hasOwnProperty(objectItem.name)) {
                        this.formObject[objectParameterName].value[objectItem.name] = {
                            name: objectItem.name,
                            type: objectItem.type,
                            value: this.formObject[objectParameterName].value[objectItem.name]
                        };
                        methodLog.push(this.formObject[objectParameterName].value[objectItem.name]);
                    }
                    this.logger.insert("defineObjectByAttributeMap", `finding ${objectItem.name}`, { ...this.formObject[objectParameterName].value });
                });
            }
            this.logger.insert("defineObjectByAttributeMap", `Defined types for ${methodLog.length} fields`, methodLog.length ? methodLog : { params: { objectParameterName, attributeMap } });
        } else {
            this.logger.insert("defineObjectByAttributeMap", "Invalid params passed", { objectParameterName, attributeMap });
        }
        return this;
    }

    /**
     * Define the mandatory fields
     * @param {Array<string>} fields The fields needed to be defined as mandatory
     * @returns {FormValidator} The form validator object
     */
    defineMandatoryFields(fields: Array<string>): FormValidator {
        const methodLog: Array<any> = [];
        if (fields && fields.length) {
            fields.map((field: string) => {
                if (this.formObject.hasOwnProperty(field)) {
                    this.formObject[field].required = true;
                    methodLog.push(this.formObject[field]);
                }
            });
            this.logger.insert("defineMandatoryFields", `Defined ${methodLog.length} fields as mandatory`, methodLog.length ? methodLog : { params: { fields } });
        } else {
            this.logger.insert("defineMandatoryFields", "Invalid params passed", { fields });
        }
        return this;
    }

    /**
     * Define the phone number fields
     * @param {Array<string>} fields The fields needed to be defined as mandatory
     * @returns {FormValidator} The form validator object
     */
    definePhoneNumberFields(fields: Array<string>): FormValidator {
        const methodLog: Array<any> = [];
        if (fields && fields.length) {
            fields.map((field: string) => {
                if (this.formObject.hasOwnProperty(field)) {
                    this.formObject[field].type = "phone";
                    methodLog.push(this.formObject[field]);
                }
            });
            this.logger.insert("definePhoneNumberFields", `Defined ${methodLog.length} phoneNumber fields`, methodLog.length ? methodLog : { params: { fields } });
        } else {
            this.logger.insert("definePhoneNumberFields", "Invalid params passed", { fields });
        }
        return this;
    }

    /**
     * Define the email fields
     * @param {Array<string>} fields The fields needed to be defined
     * @returns {FormValidator} The form validator object
     */
    defineEmailFields(fields: Array<string>): FormValidator {
        const methodLog: Array<any> = [];
        if (fields && fields.length) {
            fields.map((field: string) => {
                if (this.formObject.hasOwnProperty(field)) {
                    this.formObject[field].type = "email";
                    methodLog.push(this.formObject[field]);
                }
            });
            this.logger.insert("defineEmailFields", `Defined ${methodLog.length} email fields`, methodLog.length ? methodLog : { params: { fields } });
        } else {
            this.logger.insert("defineEmailFields", "Invalid params passed", { fields });
        }
        return this;
    }

    /**
     * Define the mandatory fields in an array of objects inside the form object
     * @param {string} arrayParameterName The name of the parameter that contains the array
     * @param {Array<string>} fields The fields in the array parameter needed to be marked as mandatory
     * @returns {FormValidator} The form validator object
     */
    defineMandatoryFieldsInArrayOfObjects(arrayParameterName: string, fields: Array<string>): FormValidator {
        const methodLog: Array<any> = [];
        if (arrayParameterName && fields && fields.length) {
            if (this.formObject.hasOwnProperty(arrayParameterName) && this.formObject[arrayParameterName].value && (this.formObject[arrayParameterName].value instanceof Array)) {
                (this.formObject[arrayParameterName].value as Array<any>).map((arrayItem: FormModel) => {
                    fields.map((field: string) => {
                        if (arrayItem.hasOwnProperty(field)) {
                            arrayItem[field].required = true;
                        }
                    });
                });
            }
            this.logger.insert("defineMandatoryFieldsInArrayOfObjects", `Defined ${methodLog.length} fields as mandatory`, methodLog.length ? methodLog : { params: { arrayParameterName, fields } });
        } else {
            this.logger.insert("defineMandatoryFieldsInArrayOfObjects", "Invalid params passed", { arrayParameterName, fields });
        }
        return this;
    }

    defineMandatoryFieldsInSubObject(objectParameterName: string, fields: Array<string>): FormValidator {
        const methodLog: Array<any> = [];
        if (objectParameterName && fields && fields.length) {
            if (this.formObject.hasOwnProperty(objectParameterName) && this.formObject[objectParameterName].value) {
                fields.map((field: string) => {
                    if (this.formObject[objectParameterName].value.hasOwnProperty(field) && !isEmpty(this.formObject[objectParameterName].value[field])) {
                        this.formObject[objectParameterName].value[field].required = true;
                    }
                });
            }
            this.logger.insert("defineMandatoryFieldsInSubObject", `Defined ${methodLog.length} fields as mandatory`, methodLog.length ? methodLog : { params: { objectParameterName, fields } });
        } else {
            this.logger.insert("defineMandatoryFieldsInSubObject", "Invalid params passed", { objectParameterName, fields });
        }
        return this;
    }

    /**
     * Defines all fields to be required
     * @returns {FormValidator} The form validator object
     */
    makeAllMandatory(): FormValidator {
        const methodLog: Array<any> = [];
        for (const field in this.formObject) {
            if (this.formObject[field].value instanceof Array) {
                this.makeAllMandatoryInArray(field);
            } else {
                this.formObject[field].required = true;
            }
            methodLog.push(this.formObject[field]);
        }
        this.logger.insert("makeAllMandatory", `Defined ${methodLog.length} fields as mandatory`, methodLog);
        return this;
    }

    /**
     * Mark all fields in an array parameter in the form object as mandatory
     * @param {string} arrayParameterName The name of the parameter that contains the array
     * @returns {FormValidator} The form validator object
     */
    makeAllMandatoryInArray(arrayParameterName: string): FormValidator {
        const methodLog: Array<any> = [];
        if (arrayParameterName) {
            if (this.formObject.hasOwnProperty(arrayParameterName) && this.formObject[arrayParameterName].value) {
                (this.formObject[arrayParameterName].value as Array<any>).map((arrayItem: FormModel) => {
                    for (const item in arrayItem) {
                        arrayItem[item].required = true;
                        methodLog.push(arrayItem[item]);
                    }
                });
            }
            this.logger.insert("makeAllMandatoryInArray", `Defined ${methodLog.length} fields as mandatory`, methodLog.length ? methodLog : { params: { arrayParameterName } });
        } else {
            this.logger.insert("makeAllMandatoryInArray", "Invalid params passed", { arrayParameterName });
        }
        return this;
    }

    /**
     * Denying future dates to be selected. Works only with fields of type `FormFieldTypes.DATE`
     * @param {Array<string>} fields The date fields that should be limited to past and current date
     * @returns {FormValidator} The form validator object
     */
    defineNoFutureDateFields(fields: Array<string>): FormValidator {
        const methodLog: Array<any> = [];
        if (fields && fields.length) {
            fields.map((field: string) => {
                if (this.formObject.hasOwnProperty(field) && this.formObject[field].type && this.formObject[field].type.toLowerCase() === "date") {
                    this.formObject[field].allowFutureDates = false;

                    methodLog.push(this.formObject[field]);
                }
            });
            this.logger.insert("defineNoFutureDateFields", `Defined ${methodLog.length} fields to deny future dates`, methodLog.length ? methodLog : { params: { fields } });
        } else {
            this.logger.insert("defineNoFutureDateFields", "Invalid params passed", { fields });
        }
        return this;
    }

    /**
     * Denying future dates to be selected in an array of objects. Works only with fields of type `FormFieldTypes.DATE`
     * @param {string} arrayParameterName The name of the parameter that contains the array
     * @param {Array<string>} fields The date fields that should be limited to past and current date
     * @returns {FormValidator} The form validator object
     */
    defineNoFutureDateFieldsInArrayOfObjects(arrayParameterName: string, fields: Array<string>): FormValidator {
        const methodLog: Array<any> = [];
        if (arrayParameterName && fields && fields.length) {
            if (this.formObject[arrayParameterName] && this.formObject[arrayParameterName].value) {
                (this.formObject[arrayParameterName].value as Array<any>).map((arrayItem: FormModel) => {
                    fields.map((field: string) => {
                        if (arrayItem.hasOwnProperty(field) && arrayItem[field].type && arrayItem[field].type.toLowerCase() === "date") {
                            arrayItem[field].allowFutureDates = false;
                            methodLog.push(arrayItem[field]);
                        }
                    });
                });
            }
            this.logger.insert(
                "defineNoFutureDateFieldsInArrayOfObjects",
                `Defined ${methodLog.length} fields to deny future dates`,
                methodLog.length ? methodLog : { params: { arrayParameterName, fields } }
            );
        } else {
            this.logger.insert("defineNoFutureDateFieldsInArrayOfObjects", "Invalid params passed", { arrayParameterName, fields });
        }
        return this;
    }

    /**
     * Limit the length of string fields
     * @param {Array<string>} fields The fields needed to be limited in length
     * @param {{min: number, max: number}} specs The specification needed to perform the comparision
     * @returns {FormValidator} The form validator object
     * @example limitLength(["password"], { min: 6, max: 12 })
     */
    defineLimitedFields(fields: Array<string>, specs: { min: number, max: number }): FormValidator {
        const methodLog: Array<any> = [];
        if (fields && fields.length && !isEmpty(specs) && !isEmpty(specs.min) && !isEmpty(specs.max)) {
            fields.map((field: string) => {
                if (this.formObject.hasOwnProperty(field)) {
                    this.formObject[field].limitLength = true;
                    this.formObject[field].specs = specs;
                    methodLog.push(this.formObject[field]);
                }
            });
            this.logger.insert(
                "defineLimitedFields",
                `Defined ${methodLog.length} fields as limited between ${specs.min} and ${specs.max}`,
                methodLog.length ? methodLog : { params: { fields, specs } }
            );
        } else {
            this.logger.insert("defineLimitedFields", "Invalid params passed", { fields, specs });
        }
        return this;
    }

    /**
     * Limit the length of string fields in an array of objects.
     * @param {string} arrayParameterName The name of the parameter that contains the array
     * @param {Array<string>} fields The fields needed to be limited in length
     * @param {{min: number, max: number}} specs The specification needed to perform the comparision
     * @returns {FormValidator} The form validator object
     * @example limitLength("credentials", ["password"], { min: 6, max: 12 })
     */
    defineLimitedFieldsInArrayOfObjects(arrayParameterName: string, fields: Array<string>, specs: { min: number, max: number }): FormValidator {
        const methodLog: Array<any> = [];
        if (arrayParameterName && fields && fields.length && !isEmpty(specs) && !isEmpty(specs.min) && !isEmpty(specs.max)) {
            if (this.formObject[arrayParameterName] && this.formObject[arrayParameterName].value) {
                (this.formObject[arrayParameterName].value as Array<any>).map((arrayItem: FormModel) => {
                    fields.map((field: string) => {
                        if (arrayItem.hasOwnProperty(field)) {
                            arrayItem[field].limitLength = true;
                            arrayItem[field].specs = specs;
                        }
                    });
                });
            }
            this.logger.insert(
                "defineLimitedFieldsInArrayOfObjects",
                `Defined ${methodLog.length} fields in ${arrayParameterName} array as limited between ${specs.min} and ${specs.max}`,
                methodLog.length ? methodLog : { params: { arrayParameterName, fields, specs } }
            );
        } else {
            this.logger.insert("defineLimitedFieldsInArrayOfObjects", "Invalid params passed", { arrayParameterName, fields, specs });
        }
        return this;
    }

    /**
     * Set minimum value for fields passed
     * @param {Array<string>} fields The fields needed to be limited
     * @param {number} min The specification needed to perform the comparision
     * @returns {FormValidator} The form validator object
     * @example defineMinValueFields(["amount"], 5)
     */
    defineMinValueFields(fields: Array<string>, min: number): FormValidator {
        const methodLog: Array<any> = [];
        if (fields && fields.length && !isEmpty(min)) {
            fields.map((field: string) => {
                if (this.formObject.hasOwnProperty(field)) {
                    this.formObject[field].minValue = true;
                    this.formObject[field].specs = this.formObject[field].specs ? { ...this.formObject[field].specs, min } : { min };
                    methodLog.push(this.formObject[field]);
                }
            });
            this.logger.insert(
                "defineMinValueFields",
                `Defined ${methodLog.length} fields as limited to at least ${min}`,
                methodLog.length ? methodLog : { params: { fields, min } }
            );
        } else {
            this.logger.insert("defineMinValueFields", "Invalid params passed", { fields, min });
        }
        return this;
    }

    /**
     * Set maximum value for fields passed
     * @param {Array<string>} fields The fields needed to be limited
     * @param {number} max The specification needed to perform the comparision
     * @returns {FormValidator} The form validator object
     * @example defineMaxValueFields(["amount"], 5)
     */
    defineMaxValueFields(fields: Array<string>, max: number): FormValidator {
        const methodLog: Array<any> = [];
        if (fields && fields.length && !isEmpty(max)) {
            fields.map((field: string) => {
                if (this.formObject.hasOwnProperty(field)) {
                    this.formObject[field].maxValue = true;
                    this.formObject[field].specs = this.formObject[field].specs ? { ...this.formObject[field].specs, max } : { max };
                    methodLog.push(this.formObject[field]);
                }
            });
            this.logger.insert(
                "defineMaxValueFields",
                `Defined ${methodLog.length} fields as limited to me maximum ${max}`,
                methodLog.length ? methodLog : { params: { fields, max } }
            );
        } else {
            this.logger.insert("defineMaxValueFields", "Invalid params passed", { fields, max });
        }
        return this;
    }

    /**
     * Limit the value of number field in an array of objects.
     * @param {string} arrayParameterName The name of the parameter that contains the array
     * @param {Array<string>} fields The fields needed to be limited
     * @param {number} min The specification needed to perform the comparision
     * @returns {FormValidator} The form validator object
     * @example defineMinValueFieldsInArrayOfObjects("person", ["age"], min: 0)
     */
    defineMinValueFieldsInArrayOfObjects(arrayParameterName: string, fields: Array<string>, min: number): FormValidator {
        const methodLog: Array<any> = [];
        if (arrayParameterName && fields && fields.length && !isEmpty(min)) {
            if (this.formObject[arrayParameterName] && this.formObject[arrayParameterName].value) {
                (this.formObject[arrayParameterName].value as Array<any>).map((arrayItem: FormModel) => {
                    fields.map((field: string) => {
                        if (arrayItem.hasOwnProperty(field)) {
                            arrayItem[field].minValue = true;
                            arrayItem[field].specs = this.formObject[field].specs ? { ...this.formObject[field].specs, min } : { min };
                        }
                    });
                });
            }
            this.logger.insert(
                "defineLimitedFieldsInArrayOfObjects",
                `Defined ${methodLog.length} fields in ${arrayParameterName} array as limited to ${min}`,
                methodLog.length ? methodLog : { params: { arrayParameterName, fields, min } }
            );
        } else {
            this.logger.insert("defineLimitedFieldsInArrayOfObjects", "Invalid params passed", { arrayParameterName, fields, min });
        }
        return this;
    }

    /**
     * Add a custom validator that returns an error message if found
     * @param {Array<string>} fields The fields will be validated
     * @param {Array<string>} errorFields The fields where the error is inflicted
     * @param {function} validator The validator method
     * @returns {FormValidator} The form validator object
     * @example addValidator(["balance", "payment"], ["payment"], (balance: number, payment: number) => { return payment > balance ? "The payment exceeds your balance" : null; });
     */
    addCustomValidator(fields: Array<string>, errorFields: Array<string>, validator: (...params) => string): FormValidator {
        if (fields && fields.length && errorFields && errorFields.length && validator) {
            const extraValidatorIndex: number = this.extraValidators.push({
                fields: fields,
                validate: validator,
                errorFields: errorFields
            });
            this.logger.insert(
                "addCustomValidator",
                `Added a custom validator for \`${fields.toString()}\``,
                { ...this.extraValidators[extraValidatorIndex - 1], validator: this.extraValidators[extraValidatorIndex - 1].validate.toString() }
            );
        } else {
            this.logger.insert("addCustomValidator", "Invalid params passed", { fields, errorFields, validator });
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
    validate(): FormValidator {
        let error: string;
        const methodLog: Array<any> = [];
        for (const field in this.formObject) {
            error = null;
            if (["string", "number"].indexOf(this.formObject[field].type) !== -1) { // String and number validations
                error = this.validateField(this.prepareCriteraForTextFields(this.formObject[field]));
                if (error) { this.errors[field] = error; }
                methodLog.push({ field, value: this.formObject[field].value, type: this.formObject[field].type, error: this.errors[field] });
            } else if (this.formObject[field].type === "email") { // Email validations
                error = this.validateField(this.prepareCriteraForEmailFields(this.formObject[field]));
                if (error) { this.errors[field] = error; }
                methodLog.push({ field, value: this.formObject[field].value, type: this.formObject[field].type, error: this.errors[field] });
            } else if (this.formObject[field].type && this.formObject[field].type.toLowerCase() === "date") { // Date validations
                error = this.validateField(this.prepareCriteraForDateFields(this.formObject[field]));
                if (error) { this.errors[field] = error; }
                methodLog.push({ field, value: this.formObject[field].value, type: this.formObject[field].type, error: this.errors[field] });
            } else if (this.formObject[field].type && this.formObject[field].type === "phone") {
                error = this.validateField(this.prepareCriteriaforPhoneNumberFields(this.formObject[field]));
                if (error) { this.errors[field] = error; }
                methodLog.push({ field, value: this.formObject[field].value, type: this.formObject[field].type, error: this.errors[field] });
            } else if ((this.formObject[field].value instanceof Array) && this.formObject[field].value.length) { // Array
                const arrayOfErrors: Array<{ [index: string]: string }> = [];
                (this.formObject[field].value as Array<ValidatorModelItem>).map((arrayItem: ValidatorModelItem, arrayItemIndex: number) => {
                    const arrayItemErrorObject: { [index: string]: string } = {};
                    let arrayFieldError: string = null;
                    // Validating each field inside an array of objects
                    for (const arrayField in arrayItem) {
                        if (["string", "number"].indexOf(arrayItem[arrayField].type) !== -1) { // String and number validations
                            arrayFieldError = this.validateField(this.prepareCriteraForTextFields(arrayItem[arrayField]));
                        } else if (arrayItem.type && arrayItem.type.toLowerCase() === "date") { // Date validations
                            arrayFieldError = this.validateField(this.prepareCriteraForDateFields(arrayItem[arrayField]));
                        }
                        if (arrayFieldError) {
                            arrayItemErrorObject[arrayField] = arrayFieldError;
                        }
                    }
                    arrayOfErrors.push(isEmpty(arrayItemErrorObject) ? null : arrayItemErrorObject);
                });
                if (arrayOfErrors.filter((item: { [index: string]: string }) => item !== null).length) {
                    this.errors[field] = arrayOfErrors;
                }
                methodLog.push({ field, value: this.formObject[field].value, type: this.formObject[field].type, error: this.errors[field] });
            } else {
                if (this.formObject[field].required) {
                    this.formObject[field].criteria = [validateTypes.isEmpty];
                    error = this.validateField(this.formObject[field]);
                    if (error) { this.errors[field] = error; }
                }
                methodLog.push({ field, value: this.formObject[field].value, type: this.formObject[field].type, error: this.errors[field] });
            }
        }

        if (this.extraValidators.length) {
            this.extraValidators.map((extraValidator: ExtraValidator) => {
                const valuesOfFields: Array<any> = [];
                extraValidator.fields.map((field: string) => {
                    if (this.formObject.hasOwnProperty(field)) {
                        valuesOfFields.push(this.formObject[field].value);
                    }
                });
                const extraValidatorError: string = extraValidator.validate(...valuesOfFields);
                extraValidator.errorFields.map((field: string) => {
                    if (this.formObject.hasOwnProperty(field) && !this.errors[field]) {
                        (extraValidatorError) && (this.errors[field] = extraValidatorError);
                        methodLog.push({ field, value: this.formObject[field].value, type: this.formObject[field].type, error: this.errors[field] });
                    }
                });
            });
        }
        this.logger.insert("validate", `Validated ${methodLog.length} times`, methodLog);
        return this;
    }

    /**
     * Show log
     * @param {LoggerOptions} [options] The context of the log that needed to be displayed
     * @returns {FormValidator} The form validator object
     */
    showLog(options?: LoggerOptions): FormValidator {
        this.logger.displayLog(options);
        return this;
    }

    /**
     * Perpare the criteria for a text field to run validation
     * @param {ValidatorModelItem} fieldObject The field object to generate the criteria
     * @returns {Array<validateTypes>} The generate list of criteria
     */
    private prepareCriteraForTextFields(fieldObject: ValidatorModelItem): ValidatorModelItem {
        const criteria: Array<validateTypes> = [];
        if (fieldObject.required) {
            criteria.push(validateTypes.isEmpty);
        }
        criteria.push(validateTypes.noWhitespace);
        if (fieldObject.limitLength) {
            criteria.push(validateTypes.textRange);
        }
        if (fieldObject.minValue) {
            criteria.push(validateTypes.minValue);
        }
        if (fieldObject.maxValue) {
            criteria.push(validateTypes.maxValue);
        }
        fieldObject.criteria = criteria;
        this.logger.insert("prepareCriteraForTextFields", `[P] Generated ${criteria.length} validation criteria for ${fieldObject.name}`, criteria);
        return fieldObject;
    }

    /**
     * Perpare the criteria for a text field to run validation
     * @param {ValidatorModelItem} fieldObject The field object to generate the criteria
     * @returns {Array<validateTypes>} The generate list of criteria
     */
    private prepareCriteraForEmailFields(fieldObject: ValidatorModelItem): ValidatorModelItem {
        const criteria: Array<validateTypes> = [];
        if (fieldObject.required) {
            criteria.push(validateTypes.isEmpty);
        }
        criteria.push(validateTypes.noWhitespace, validateTypes.validEmail);
        fieldObject.criteria = criteria;
        this.logger.insert("prepareCriteraForTextFields", `[P] Generated ${criteria.length} validation criteria for ${fieldObject.name}`, criteria);
        return fieldObject;
    }

    /**
     * Perpare the criteria for a phone field to run validation
     * @param {ValidatorModelItem} fieldObject The field object to generate the criteria
     * @returns {Array<validateTypes>} The generate list of criteria
     */
    private prepareCriteriaforPhoneNumberFields(fieldObject: ValidatorModelItem): ValidatorModelItem {
        const criteria: Array<validateTypes> = [];
        if (fieldObject.required) {
            criteria.push(validateTypes.isEmpty);
        }
        criteria.push(validateTypes.validPhoneNumber);
        fieldObject.criteria = criteria;
        this.logger.insert("prepareCriteriaforPhoneNumberFields", `[P] Generated ${criteria.length} validation criteria for ${fieldObject.name}`, criteria);
        return fieldObject;
    }

    /**
     * Perpare the criteria for a datepicker to run validation
     * @param {ValidatorModelItem} fieldObject The field object to generate the criteria
     * @returns {Array<validateTypes>} The generate list of criteria
     */
    private prepareCriteraForDateFields(fieldObject: ValidatorModelItem): ValidatorModelItem {
        const criteria: Array<validateTypes> = [];
        if (fieldObject.required) {
            criteria.push(validateTypes.isEmpty, validateTypes.isDate);
        }
        if (fieldObject.allowFutureDates === false) {
            criteria.push(validateTypes.noFuture);
        }

        fieldObject.criteria = criteria;
        this.logger.insert("prepareCriteraForDateFields", `[P] Generated ${criteria.length} validation criteria for ${fieldObject.name}`, criteria);
        return fieldObject;
    }

    /**
     * Store the passed form object locally
     * @param {any} formObject The formObject to be validated
     */
    private storeFormObject(formObject: any): void {
        if (!isEmpty(formObject)) {
            for (const field in formObject) {
                if ((formObject[field] instanceof Array)) {
                    this.formObject[field] = {
                        name: field,
                        value: [],
                        type: "Array"
                    };
                    if (formObject[field].length) {
                        (formObject[field] as Array<any>).map((arrayItem: any) => {
                            const arrayItemObject: FormModel = {};
                            for (const item in arrayItem) {
                                arrayItemObject[item] = {
                                    name: item,
                                    value: arrayItem[item]
                                };
                            }
                            this.formObject[field].value.push(arrayItemObject);
                        });
                    }
                } else if ((formObject[field] instanceof Object) && !(formObject[field] instanceof Date)) {
                    this.formObject[field] = {
                        name: field,
                        value: {},
                        type: "Object"
                    };
                    for (const item in formObject[field]) {
                        this.formObject[field].value[item] = {
                            name: item,
                            value: formObject[field][item]
                        };
                    }
                } else if ((formObject[field] instanceof Object) && (formObject[field] instanceof Date)) {
                    this.formObject[field] = {
                        name: field,
                        value: formObject[field],
                        type: "Date"
                    };
                } else {
                    this.formObject[field] = {
                        name: field,
                        value: formObject[field],
                        type: "string"
                    };
                }
            }
            this.logger.insert("storeFormObject", "[P] Stored form object locally", this.formObject);
        } else {
            console.error("Form Validator: Invalid form object provided.");
        }
    }

    /**
     * Validate a parameter in the form formObject based on predefined set of criteria
     * @param {ValidatorModelItem} fieldObject The field object stored in the local formObject
     * @returns {string} The error found in the parameter
     */
    private validateField(fieldObject: ValidatorModelItem): string {
        let i: number = 0;
        let error: string = null;
        const methodLog: Array<any> = [];
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
                methodLog.push({ ...fieldObject, error, criteria: fieldObject.criteria[i] });
                i++;
            } while (i < fieldObject.criteria.length && !error);
        }
        this.logger.insert("validateField", `Validating \`${fieldObject.name}\` field resulted in: ${error ? "invalid" : "valid"}`, methodLog);
        return error;
    }
}

/**
 * Validation criteria types used in the `validate` method
 * @member isEmpty
 * @member isDate
 * @member noWhitespace
 * @member noFuture
 * @member textRange
 * @member minValue
 */
const enum validateTypes {
    /** The field is empty */
    isEmpty = "IS_EMPTY",
    /** The input is a validate date object */
    isDate = "IS_DATE",
    /** The input is a single or a group of whitespaces */
    noWhitespace = "noWhitespace",
    /** The date provided is set in the future */
    noFuture = "NO_FUTURE",
    /** The number of characters range between two predefined limits passed using `specs` */
    textRange = "TEXT_RANGE",
    /** Valid email format */
    validEmail = "validEmail",
    /** Valid minimum value */
    minValue = "MIN_VALUE",
    /*** Valid maximum value */
    maxValue = "MAX_VALUE",
    /** Valid phone number */
    validPhoneNumber = "validPhoneNumber"
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

export const enum FormFieldTypes {
    DATE = "date",
    STRING = "string",
    NUMBER = "number"
}
