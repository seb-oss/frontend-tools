import { isValidDate } from "../isValidDate";

/**
 * Compare and returns the dirrence between two dates
 * @param {Date} firstDate { date} the first date
 * @param {Date} secondDate { date } second date to compare against
 * @param {any} range DEPRACATED (This argument is depracated)
 * @returns {number} The difference in days
 */
export function dateDiff(
    firstDate: Date,
    secondDate: Date,
    range?: any
): number {
    if (range) {
        console.warn(
            'The range argument has been depracated. The range "day" will be used instead. \nTo compare units less than day use firstDate.getTime() - secondDate.getTime() to get milliseconds'
        );
    }
    if (!isValidDate(firstDate) || !isValidDate(secondDate)) {
        throw new Error("both parameters must be of type Date");
    }
    return Math.ceil(
        (secondDate.getTime() - firstDate.getTime()) / 1000 / 60 / 60 / 24
    );
}
