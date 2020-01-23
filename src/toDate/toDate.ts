import moment, { Moment } from "moment";

/**
 * Retrives a date object based on a string date or date object
 * @param value The date value to use to retrive the date
 * @param inputFormat The format of the input, if it's a string and the format is known
 * @returns The date object
 */
export function toDate(value: string | Date, inputFormat: string = null): Date {
    if (value) {
        const momentDate: Moment = moment(value, inputFormat);
        if (momentDate.isValid()) {
            return momentDate.toDate();
        }
    }
    return null;
}
