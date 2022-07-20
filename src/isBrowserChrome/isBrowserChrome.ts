/**
 * Check if the current browser is Chrome
 * @returns {boolean} True if Chrome
 */
export function isBrowserChrome(): boolean {
    return (
        !!(window as any).chrome &&
        (!!(window as any).chrome.webstore || !!(window as any).chrome.runtime)
    );
}
