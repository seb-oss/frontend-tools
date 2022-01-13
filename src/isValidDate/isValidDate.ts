/**
 * Is valid date: Checks if the date is valid
 * @returns {boolean} true if the date is a valid date and false if not
 * @param date
 */
export function isValidDate(date: Date): boolean {
    return !!(date && date instanceof Date && !isNaN(date.getTime()));
}
