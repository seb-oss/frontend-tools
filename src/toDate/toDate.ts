import { isValidDate } from "../isValidDate";

export type DateComponents = [number, number, number?, number?, number?, number?, number?];

/**
 * Retrives a date object based on various inputs
 * @param value The date value to use to retrive the date
 * @returns The date object
 */
export function toDate(
    value: Date | string | number | DateComponents | null | undefined,
    /** DEPRACATED! The input format has been depracated. The default javascript Date object string constructor will be used instead  */
    inputFormat?: any
)   {
    if (inputFormat) {
        console.warn("The inputFormat has been depracated. The default javascript Date object string constructor will be used instead");
    }
    switch(true) {
        case !value: return null;
        case value instanceof Date: return value;
        case typeof value === "string" || typeof value === "number":
            const newDate: Date = new Date(value);
            return isValidDate(newDate) ? newDate : null;
        case typeof value === "object" && Array.isArray(value) && value.length > 1:
            const newDate: Date = new Date(...value as DateComponents);
            return isValidDate(newDate) ? newDate : null;
    }
    return null;
}
