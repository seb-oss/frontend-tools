/**
 * Converts an array into an object
 * @param array The target array
 * @param keyField The key to be used as identifier for each key of the new object
 * @returns {Object} The generated object
 */
export function arrayToObject(array: Array<any>, keyField: string = ""): any {
    return Object.assign(
        {},
        ...array.map((item, index) => ({ [keyField + index]: item }))
    );
}
