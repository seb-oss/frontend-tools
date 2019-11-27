/**
 * Inserts values in a string
 * This is mostly used to insert values in a translation message
 * @param {string} str The string that contains the variables
 * @param {object} params The params to insert in the string message
 * @returns The replaced string
 */
export function stringInsert(str: string, params: { [key: string]: string | number | boolean }, symbol: string = "@"): string {
    const s: string = symbol || "@";
    for (const key in params) {
        str = str.replace(new RegExp(`${s}${key}${s}`, "g"), String(params[key]));
    }
    return str;
}
