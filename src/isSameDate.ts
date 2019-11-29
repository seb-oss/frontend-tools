import moment from "moment";
import { clearTime } from "./clearTime";

/**
 * Compare two dates and return true they are the same date ignoring the time
 * @param {Date} a The first date,
 * @param {Date} b The second date
 * @returns {boolean} True if date are the same
 */
export function isSameDate(a: Date, b: Date): boolean {
    console.table({ a: moment(clearTime(a)).toString(), b: moment(clearTime(b)).toString() });
    return moment(clearTime(a)).isSame(moment(clearTime(b)));
}
