import { isBrowserOpera } from "../isBrowserOpera/isBrowserOpera";
import { isBrowserFirefox } from "../isBrowserFirefox/isBrowserFirefox";
import { isBrowserSafari } from "../isBrowserSafari/isBrowserSafari";
import { isBrowserChrome } from "../isBrowserChrome/isBrowserChrome";
import { isBrowserIE } from "../isBrowserIE/isBrowserIE";
import { isBrowserEdge } from "../isBrowserEdge/isBrowserEdge";

/**
 * Get the name of the current browser
 * @note The method detects the browser by features
 * @returns {string} The name of the browser
 */
export function getBrowserName(): string {
    if (isBrowserOpera()) {
        return "Opera";
    } else if (isBrowserFirefox()) {
        return "Firefox";
    } else if (isBrowserSafari()) {
        return "Safari";
    } else if (isBrowserIE()) {
        return "IE";
    } else if (isBrowserEdge()) {
        return "Edge";
    } else if (isBrowserChrome()) {
        return "Chrome";
    } else {
        return "";
    }
}
