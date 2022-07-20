/**
 * Check if an email is valid
 * @param {string} value email
 * @returns {boolean} true if email is valid, false if email is not valid
 */
export function isEmail(value: string): boolean {
    return new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(value);
}
