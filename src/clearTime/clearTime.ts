/**
 * Clear the time of a date object
 * @param {Date} date The date to clear its time
 * @returns {Date} The cleared date object
 */
export function clearTime(date: Date): Date {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    date.setHours(0, 0, 0, 0);
    return date;
}
