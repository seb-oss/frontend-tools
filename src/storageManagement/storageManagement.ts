import { CookieStorage } from "../cookieStorage/CookieStorage";

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
     * Retrieves the list of keys in the stored storage
     * @returns The list of keys in the stored storage
     */
    keys(): Array<string> {
        if (this.handler.keys) {
            return this.handler.keys();
        } else {
            return Object.keys(this.handler);
        }
    }

    key(index: number): string {
        return this.keys()[index];
    }
}
