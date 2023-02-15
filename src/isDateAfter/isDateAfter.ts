import { isValidDate } from "../isValidDate";

/**
 * Compare two dates and return true if the first is greater than the second ignoring the time
 * @param {Date} a The first date
 * @param {Date} b The second date
 * @returns {boolean} True if date `a` comes after than date `b`
 */
export function isDateAfter(a: Date, b: Date): boolean {
    if (isValidDate(a) && isValidDate(b)) {
        return a.setHours(0, 0, 0).valueOf() > b.setHours(0, 0, 0).valueOf();
    }

    return a > b;
}
