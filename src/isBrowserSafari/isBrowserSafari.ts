/**
 * Check if the current browser is Safari
 * @returns {boolean} True if Safari
 */
export function isBrowserSafari(): boolean {
    return (
        /constructor/i.test((window as any).HTMLElement) ||
        ((p) => p.toString() === "[object SafariRemoteNotification]")(
            !(window as any)["safari"] ||
                (typeof (window as any).safari !== "undefined" &&
                    (window as any).safari.pushNotification)
        )
    );
}
