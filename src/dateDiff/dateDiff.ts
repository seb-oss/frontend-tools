import moment from "moment";

/**
 * Compare and returns the dirrence between two dates
 * @param {Date} firstDate { date} the first date
 * @param {Date} secondDate { date } second date to compare against
 * @param {moment.DurationInputArg2} range {moment.DurationInputArg2} the range example , months , seconds, h, m, y etc
 * @returns {number} The difference based on the range type
 */
export function dateDiff(firstDate: Date, secondDate: Date, range: moment.DurationInputArg2): number {
    if (!moment(firstDate).isValid() || !moment(secondDate).isValid()) {
        throw new Error("from parameter must be of date type");
    }
    return moment.utc(firstDate).diff(secondDate, range);
}
