import moment from "moment";

/**
 * Reformats any date string to any desired format
 * @param date The date string
 * @param inputFormat The format of the date needs to be reformatted
 * @param outputFormat The format needed
 * @param locale Date locale
 * @implements momentjs - refer to momentjs documentation to see the different formats supported
 * @note
 * Having an input format is critial to insure accuracy.
 * Passing `01-10-2019` might be interpreted as `Jan 10` or `Oct 01` based on locale
 */
export function formatDate(date: string | Date, inputFormat: string, outputFormat: string, locale?: moment.LocaleSpecifier): string {
    if (date) {
        let momentDate = moment(date, inputFormat);
        if (momentDate.isValid()) {
            if (locale) {
                momentDate = momentDate.locale(locale);
            }
            return momentDate.format(outputFormat).toString();
        }
    }
    return null;
}
