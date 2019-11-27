/**
 * Check if the current browser is Edge
 * @returns {boolean} True if Edge
 */
export function isBrowserEdge(): boolean {
    return !(window as any).isIE && !!(window as any).StyleMedia;
}
