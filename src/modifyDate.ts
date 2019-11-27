import moment from "moment";

/**
 * Modifies a date by either adding or substracting a certain range
 * @param {Date} from {date} the starting date
 * @param {number} value {number} the value you want added or substractedf
 * @param {"ADD" | "SUBTRACT"} type {ADD | SUBSTRACT} the operation type
 * @param {moment.DurationInputArg2} range {moment.DurationInputArg2} the range example , months , seconds, h, m, y etc
 * @returns {string} The modified date
 */
export function modifyDate(from: Date, value: number, type: "ADD" | "SUBTRACT", range: moment.DurationInputArg2): Date {
    if (!moment(from).isValid()) {
        from = moment().toDate();
    }
    switch (type) {
        case "ADD": return moment(from).add(value, range).toDate();
        case "SUBTRACT": return moment(from).subtract(value, range).toDate();
        default: return moment().toDate();
    }
}
