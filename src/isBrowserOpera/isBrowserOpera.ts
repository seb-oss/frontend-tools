/**
 * Check if the current browser is Opera
 * @returns {boolean} True if Opera
 */
export function isBrowserOpera(): boolean {
    return (
        (!!(window as any).opr && !!(window as any).opr.addons) ||
        !!(window as any).opera ||
        navigator.userAgent.indexOf(" OPR/") >= 0
    );
}
