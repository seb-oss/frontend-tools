export interface SetItemOptions {
    /** Expiration Date */
    expires?: Date;
    /** Maximum age in seconds */
    maxAge?: number;
    /** Secure cookie. Set the security to `true` if you want it to be encrypted in **HTTPS** connections */
    secure?: boolean;
}
/**
 * CookieStorage is a handler for reading and writing cookies in Javascript
 * Usage is similar to `localStorage` and `sessionStorage`
 */
export class CookieStorage implements Storage {
    get length(): number { return this.keys().length; }

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
     * @param options Available options are `expires`, `maxAge` and `secure` @see SetItemOptions interface for reference
     * @returns `true` if successful
     */
    setItem(key: string, value: any, options: SetItemOptions = {}): boolean {
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
            return false;
        }
        let expires: string = "";
        let maxAge: string = "";
        const secure: string = options && options.secure ? "; Secure" : "";
        if (options) {
            if (options.expires && options.expires instanceof Date) {
                expires = "; Expires=" + options.expires.toUTCString();
            }
            if (options.maxAge && typeof options.maxAge === "number" && options.maxAge !== Infinity) {
                maxAge = `; Max-age=${options.maxAge}`;
            }
        }
        document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}${expires}${maxAge}${secure}`;
        return this.hasItem(key);
    }

    /**
     * Remove an item from the stored cookie
     * @param {string} key The key of the cookie to be removed
     * @returns {boolean} `true` if successful
     */
    removeItem(key: string): boolean {
        if (this.hasItem(key)) {
            document.cookie = `${encodeURIComponent(key)}=; max-age=-1`;
        }
        return !this.hasItem(key);
    }

    /**
     * Verifies if an item exists in the cookie
     * @param {string} key The key of the item to be verified
     * @returns {boolean} `true` if it exists
     */
    hasItem(key: string): boolean {
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
            return false;
        }
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }

    clear(): void {
        const cookies: Array<string> = document.cookie.split(";");

        for (let i: number = 0; i < cookies.length; i++) {
            const cookie: string = cookies[i];
            const eqPos: number = cookie.indexOf("=");
            const name: string = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            const value: string = eqPos > -1 ? cookie.substr(eqPos + 1, cookie.length) : "";
            document.cookie = `${name}${value ? "=" : ""}; max-age=-1`;
        }
    }

    /**
     * Retrives the list of keys in the stored cookie
     * @returns The list of keys in the stored cookie
     */
    keys(): Array<string> {
        const aKeys: Array<string> = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (let nLen: number = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }

    /**
     * @param index The index of the array of keys
     * @returns The key at the given index, if any
     */
    key(index: number): string {
        return this.keys()[index];
    }
}
