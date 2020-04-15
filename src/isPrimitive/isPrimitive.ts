/**
 * Verifies if a value is primitive (string, number, boolean)
 * @param {any} value The value to be tested
 * @returns {boolean} True if it's primitive, false otherwise
 */
export function isPrimitive(value: any): boolean {
    return (value !== Object(value));
}
