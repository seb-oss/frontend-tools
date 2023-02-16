import { isValidDate } from "../isValidDate";

/**
 * Compare two dates and return true if the first date is the same as the second date ignoring the time.
 *
 * @param {Date} a The first date,
 * @param {Date} b The second date
 * @returns {boolean} True if date `a` is the same as date `b`
 */
export function isSameDate(a: Date, b: Date): boolean {
    if (isValidDate(a) && isValidDate(b)) {
        a.setHours(0, 0, 0, 0);
        b.setHours(0, 0, 0, 0);
        return a.valueOf() === b.valueOf();
    }

    return a > b;
}
