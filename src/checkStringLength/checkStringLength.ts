/**
 * Check if a string matches a specific length
 * @param {string} value The string to be checked
 * @param {number} min The desired minimum length
 * @param {number} max The desired maximum length
 * @returns {boolean} True if the string length falls between the minimum and the maximum
 */
export function checkStringLength(value: string, min: number, max: number): boolean {
    return value && (value.length >= min && value.length <= max);
}
