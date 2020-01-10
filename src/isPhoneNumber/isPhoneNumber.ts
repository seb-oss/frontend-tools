/**
 * Verifies if a string is a valid phone number
 * @param {string | number} value Value to be verified
 * @returns {boolean} true if it is valid
 */
export function isPhoneNumber(value: string | number): boolean {
    return new RegExp(/^(0)?([0-9]{7,13})$/g).test(String(value));
}
