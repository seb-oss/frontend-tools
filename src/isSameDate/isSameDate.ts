import { isValidDate } from "../isValidDate";

/**
 * Compare two dates and return true they are the same date ignoring the time
 * @param {Date} a The first date,
 * @param {Date} b The second date
 * @returns {boolean} True if date are the same
 */
export function isSameDate(a: Date, b: Date): boolean {
    if (!isValidDate(a) || !isValidDate(b)) {
        return false;
    } else {
        return a.toLocaleDateString() === b.toLocaleDateString();
    }
}
