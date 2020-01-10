/**
 * Capitalizes a string word. It doesn't capitalize a sentence, only the first letter.
 * @param {string} str The string needed to be capitalized
 * @returns {string} The capitalized string
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.substr(1, str.length - 1);
}
