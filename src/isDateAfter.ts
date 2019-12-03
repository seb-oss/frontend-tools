import moment from "moment";
import { clearTime } from "./clearTime";

/**
 * Compare two dates and return true if the first is greater than the second ignoring the time
 * @param {Date} a The first date
 * @param {Date} b The second date
 * @returns {boolean} True if date `a` comes after than date `b`
 */
export function isDateAfter(a: Date, b: Date): boolean {
    return moment(clearTime(a)).isAfter(moment(clearTime(b)));
}
