import { CookieStorage } from "./cookieStorage";

export type StorageManagementType = "LOCAL" | "SESSION" | "COOKIE";

export class StorageManagement implements Storage {
    private handler: Storage;
    get length(): number { return this.keys.length; }

    constructor(type: StorageManagementType = "LOCAL") {
        switch (type) {
            case "LOCAL": this.handler = localStorage; break;
            case "SESSION": this.handler = sessionStorage; break;
            case "COOKIE": this.handler = new CookieStorage(); break;
            default: this.handler = localStorage;
        }
    }

    setItem(key: string, value: string): void {
        this.handler.setItem(key, value);
    }

    getItem(key: string): string {
        return this.handler.getItem(key);
    }

    removeItem(key: string): boolean {
        if (this.handler.getItem(key)) {
            this.handler.removeItem(key);
            return true;
        }
        return false;
    }

    clear(): void {
        this.handler.clear();
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
