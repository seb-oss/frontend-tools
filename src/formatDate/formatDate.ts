import moment, { Moment, MomentFormatSpecification, LocaleSpecifier } from "moment";

export interface FormatDateOptions {
    inputFormat?: MomentFormatSpecification;
    locale?: LocaleSpecifier;
}

/**
 * Reformats any date string to any desired format
 * @param date The date string
 * @param outputFormat The desired output format
 * @param options input format and locale
 * @implements momentjs - refer to momentjs documentation to see the different formats supported
 * @note
 * Having an input format is critial to insure accuracy if you are not dealing with ISO date string.
 * Passing `01-10-2019` might be interpreted as `Jan 10` or `Oct 01` based on locale
 * @returns The formatted date string
 */
export function formatDate(date: string | Date, outputFormat: string, options?: FormatDateOptions): string {
    if (date) {
        let momentDate: Moment = moment(date, options?.inputFormat || null);
        if (momentDate.isValid()) {
            if (options?.locale) {
                momentDate = momentDate.locale(options.locale);
            }
            return momentDate.format(outputFormat).toString();
        }
    }
    return null;
}
