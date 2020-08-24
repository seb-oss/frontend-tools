/**
 * Date formatter
 * @param date The date object or date string
 * @param format The output format
 * @param locale The locale. Default is `sv-SE`
 * @returns The formattted date or the input if it fails to parse it
 */
export function formatDate(
    date: string | Date,
    format: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    },
    locale: string = "sv-SE"
): string {
    const parsedDate = Date.parse(date as any);
    if (isNaN(parsedDate)) {
        return String(date);
    }
    return Intl.DateTimeFormat(locale, format).format(new Date(parsedDate));
}
