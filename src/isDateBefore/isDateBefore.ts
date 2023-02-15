import { isValidDate } from "../isValidDate";

/**
 * Compare two dates and return true if the first is less (or before) than the second ignoring the time
 * @param {Date} a The first date
 * @param {Date} b The second date
 * @returns {boolean} True if date `a` comes before date `b`
 */
export function isDateBefore(a: Date, b: Date): boolean {
    if (isValidDate(a) && isValidDate(b)) {
        return a.setHours(0, 0, 0).valueOf() < b.setHours(0, 0, 0).valueOf();
    }

    return a < b;
}
