/**
 * Check if the current browser is Firefox
 * @returns {boolean} True if Firefox
 */
export function isBrowserFirefox(): boolean {
    return !!(window as any).InstallTrigger;
}
