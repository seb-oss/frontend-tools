import moment from "moment";

/**
 * Convert date object to local String
 * @param {Date} date The date object
 * @returns return new date string in the format `June 13, 2019`
 */
export function toLocalDateString(date: Date): string {
    if (date && date instanceof Date) {
        return moment(date).local().format("LL");
    } else {
        return String(date);
    }
}
