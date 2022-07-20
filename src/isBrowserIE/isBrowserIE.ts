/**
 * Check if the current browser is IE
 * @returns {boolean} True if IE
 */
export function isBrowserIE(): boolean {
    return /*@cc_on!@*/ false || !!(document as any).documentMode;
}
