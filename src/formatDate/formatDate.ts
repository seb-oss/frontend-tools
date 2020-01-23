import moment, { Moment, MomentFormatSpecification, LocaleSpecifier } from "moment";

export interface FormatDateOptions {
    inputFormat?: MomentFormatSpecification;
    outputFormat?: string;
    locale?: LocaleSpecifier;
}

/**
 * Reformats any date string to any desired format
 * @param date The date string
 * @param options input, output and locale information
 * @implements momentjs - refer to momentjs documentation to see the different formats supported
 * @note
 * Having an input format is critial to insure accuracy.
 * Passing `01-10-2019` might be interpreted as `Jan 10` or `Oct 01` based on locale
 * @returns The formatted date string
 */
export function formatDate(date: string | Date, options?: FormatDateOptions): string {
    if (date) {
        let momentDate: Moment = moment(date, options?.inputFormat || null);
        if (momentDate.isValid()) {
            if (options?.locale) {
                momentDate = momentDate.locale(options.locale);
            }
            return options?.outputFormat ? momentDate.format(options.outputFormat).toString() : momentDate.local().format("LL");
        }
    }
    return null;
}
