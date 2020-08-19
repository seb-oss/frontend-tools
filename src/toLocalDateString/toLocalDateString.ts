/**
 * Convert date object to local String
 * @param {Date} date The date object
 * @param {Array<string>} locales Optional array of locales (country codes) to use.
 * Locale will fallback to default system language if none provided.
 * @returns return new date string in the format `June 13, 2019` (for english locale)
 */
export function toLocalDateString(date: Date, locales?: Array<string>): string {
    if (date && date instanceof Date && !!date.toLocaleDateString) {
        return date.toLocaleDateString(locales, { year: "numeric", month: "long", day: "numeric" });
    } else {
        return String(date);
    }
}
