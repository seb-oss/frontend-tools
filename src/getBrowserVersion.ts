/**
 * Get the version of the current browser
 * @note This method detects the browser version by the navigator's user agent (`navigator.userAgent`)
 * @returns {number} The browser version, it will return `0` if it fails to find it
 */
export function getBrowserDetails(): number {
    const userAgent: string = navigator.userAgent;
    let temp: RegExpMatchArray;
    let match: RegExpMatchArray = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(match[1])) {
        temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
        return +(temp[1] || 0);
    }

    if (match[1] === "Chrome") {
        temp = userAgent.match(/\bOPR|Edge\/(\d+)/);
        if (temp != null) {
            return +temp[1] || 0;
        }
    }

    match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, "-?"];
    temp = userAgent.match(/version\/(\d+)/i);

    if (temp != null) {
        match.splice(1, 1, temp[1]);
    }

    return +match[1] || 0;
}
