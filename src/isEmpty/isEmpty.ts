/**
 * Check if a string is empty
 * @param {any} value String variable to be checked
 * @returns {boolean} True if empty
 */
export function isEmpty(value: any): boolean {
    if (value === undefined || value === null) {
        // undefined or null
        return true;
    } else if (value instanceof Date) {
        // Date object behave different from normal objects
        return false;
    } else if (value instanceof Function) {
        return false;
    } else if (value instanceof Object && !(value instanceof Array)) {
        // Object, not an array
        return Object.keys(value).length < 1;
    } else if (value.length < 1) {
        // Array or string
        return true;
    } else {
        return false;
    }
}
