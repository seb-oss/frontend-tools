/**
 * CookieStorage is a handler for reading and writing cookies in Javascript
 * Usage is similar to `localStorage` and `sessionStorage`
 */
export class CookieStorage implements Storage {
    get length(): number { return this.keys.length; }

    /**
     * Retrieve an item from the stored cookie
     * @param key The key of the cookie to be retrieved
     * @returns The value of the cookie, `null` if it doesn't exist
     */
    getItem(key: string): string {
        if (!key) {
            return null;
        }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    }

    /**
     * Sets an item to the stored cookie
     * @param key The key of the cookie to be set
     * @param value The value of the cookie
     * @param options Available options:
     * - `expires`: Expiration period. You can pass a `number` representing the number of days, or a `Date` object
     * - `path`: The path of the specified cookie. (e.g. `/dashboard`)
     * - `domain`: The subdomain of the specified cookie. (e.g. `foo.example.com`)
     * - `secure`: Set the security to `true` if you want it to be encrypted in **HTTPS** connections
     * @returns `true` if successful
     */
    setItem(key: string, value: string, options: { expires?: number | Date, path?: string, domain?: string, secure?: string } = {}): boolean {
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
            return false;
        }
        let sExpires = "";
        if (options && options.expires) {
            switch (options.expires.constructor) {
                case
                    Number: sExpires = options.expires === Infinity
                        ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
                        : "; expires=" + (new Date((options.expires as number) * 1e3 + Date.now())).toUTCString();
                            break;
                case Date: sExpires = "; expires=" + (options.expires as Date).toUTCString(); break;
            }
        }
        document.cookie = encodeURIComponent(key)
            + "="
            + encodeURIComponent(value)
            + sExpires
            + (options && options.domain ? "; domain=" + options.domain : "")
            + (options && options.path ? "; path=" + options.path : "")
            + (options && options.secure ? "; secure" : "");
        return true;
    }

    /**
     * Remove an item from the stored cookie
     * @param key The key of the cookie to be removed
     * @param options Available options:
     * - `path`: The path of the specified cookie. (e.g. `/dashboard`)
     * - `domain`: The subdomain of the specified cookie. (e.g. `foo.example.com`)
     * @returns `true` if successful
     */
    removeItem(key: string, options?: { path?: string, domain?: string }): boolean {
        if (!this.hasItem(key)) { return false; }
        document.cookie = encodeURIComponent(key)
            + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
            + (options && options.domain ? "; domain=" + options.domain : "")
            + (options && options.path ? "; path=" + options.path : "");
        return true;
    }

    /**
     * Verifies if an item exists in the cookie
     * @param key The key of the item to be verified
     * @returns `true` if it exists
     */
    hasItem(key: string): boolean {
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
            return false;
        }
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }

    clear(): void {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie: string = cookies[i];
            const eqPos: number = cookie.indexOf("=");
            const name: string = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    /**
     * Retrives the list of keys in the stored cookie
     * @returns The list of keys in the stored cookie
     */
    keys(): Array<string> {
        const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }

    key(index: number): string {
        return this.keys[index];
    }
}
