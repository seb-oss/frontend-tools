/** The current supported ranges of modifying a date */
export type ModifyDateRange = "month" | "day" | "year" | "hours" | "seconds";

/**
 * Modifies a date by either adding or substracting a certain range
 * @param {Date} from {date} the starting date
 * @param {number} value {number} the value (amount) you want added or substracted
 * @param {"ADD" | "SUBTRACT"} type {ADD | SUBSTRACT} the operation type
 * @param {"month" | "day" | "year" | "hours" | "seconds"} range the name of the range to modify, example: "month"
 */
export function modifyDate(
    from: Date,
    value: number,
    type: "ADD" | "SUBTRACT",
    range: ModifyDateRange
): Date {
    if (!from) {
        return new Date();
    } else if (from instanceof Date) {
        const newDate: Date = new Date(from);
        let rangeName: string = range;
        if (range === "day") {
            rangeName = "date";
        } else if (range === "year") {
            rangeName = "fullYear";
        }

        rangeName =
            rangeName.charAt(0).toUpperCase() +
            rangeName.substr(1, rangeName.length - 1);
        const getAccessor: string = `get${rangeName}`;
        const currentValue = from[getAccessor] ? from[getAccessor]() : null;
        if (currentValue === null) {
            console.warn(
                `Date getAccessor \"${getAccessor}\" from range ${range} does not seem to exist. Provide a valid range as: \"month\" | \"day\" | \"year\" | \"hours\" | \"seconds\"`
            );
        }

        let newValue;
        switch (type) {
            case "ADD":
                newValue = currentValue + value;
                break;
            case "SUBTRACT":
                newValue = currentValue - value;
                break;
            default:
                console.warn("value should be 'ADD' or 'SUBTRACT'");
                return new Date();
        }

        const setAccessor: string = `set${rangeName}`;
        newDate[setAccessor] && newDate[setAccessor](newValue);
        return newDate;
    }
    return new Date();
}
