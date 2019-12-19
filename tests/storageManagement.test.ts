import { StorageManagement, StorageManagementType } from "../src/storageManagement";

class LocalSessionStorageMock {
    clear() {
        Object.keys(this).map((key: string) => {
            this.removeItem(key);
        });
    }
    getItem(key) {
        return this[key] || null;
    }
    setItem(key, value) {
        if (key) {
            this[key] = value.toString();
        }
    }
    removeItem(key) {
        delete this[key];
    }
}
(global as any).localStorage = new LocalSessionStorageMock();
(global as any).sessionStorage = new LocalSessionStorageMock();
type TestCase = {
    statement: string;
    key: string;
    storageType: StorageManagementType;
    results: string;
};
type SetItemMethodTestCase = TestCase & {
    value: string;
};
type GetItemMethodTestCase = TestCase & {
    mockStorage: any;
};
type RemoveItemMethodTestCase = TestCase & {
    mockStorage: any;
    document: () => string;
};
type ClearMethodTestCase = Partial<RemoveItemMethodTestCase>;
type KeysMethodTestCase = Partial<RemoveItemMethodTestCase>;
type KeyMethodTestCase = Partial<RemoveItemMethodTestCase> & {
    index: number;
};
describe("Storage management", () => {
    it("Should be able to create new storage management", () => {
        const newStorageManagment: StorageManagement = new StorageManagement();
        expect(newStorageManagment).toBeDefined();
    });

    describe("setItem method", () => {
        const testCases: Array<SetItemMethodTestCase> = [
            {
                statement: "Should be able to set cookies with specific key",
                key: "cookieKey",
                storageType: "COOKIE",
                value: "cookie1value",
                results: "cookie1value"
            },
            {
                statement: "Should be not able to set cookies with invalid key",
                key: null,
                storageType: "COOKIE",
                value: "cookie1value",
                results: null
            },
            {
                statement: "Should be able to set session with specific key",
                key: "sessionKey",
                storageType: "SESSION",
                value: "session1value",
                results: "session1value"
            },
            {
                statement: "Should be not able to set session with invalid key",
                key: null,
                storageType: "SESSION",
                value: "session1value",
                results: null
            },
            {
                statement: "Should be able to set local with specific key",
                key: "localKey",
                storageType: "LOCAL",
                value: "local1value",
                results: "local1value"
            },
            {
                statement: "Should be not able to set local with invalid key",
                key: null,
                storageType: "LOCAL",
                value: "local1value",
                results: null
            },
            {
                statement: "Should be set to local if invalid storage type is passed",
                key: "localKey",
                storageType: "LOCALasdf" as any,
                value: "local1value",
                results: "local1value"
            },
        ];
        testCases.map((testCase: SetItemMethodTestCase) => {
            it(testCase.statement, () => {
                const newStorageManagment: StorageManagement = new StorageManagement(testCase.storageType);
                newStorageManagment.setItem(testCase.key, testCase.value);
                expect(newStorageManagment.getItem(testCase.key)).toBe(testCase.results);
            });
        });
    });

    describe("getItem method", () => {
        beforeEach(() => {
            (global as any).localStorage = new LocalSessionStorageMock();
            (global as any).sessionStorage = new LocalSessionStorageMock();
        });
        const testCases: Array<GetItemMethodTestCase> = [
            {
                statement: "Should be able to get cookies with specific key",
                key: "cookieKey",
                storageType: "COOKIE",
                results: "cookie1value",
                mockStorage: () => {
                    Object.defineProperty(window.document, "cookie", {
                        writable: true,
                        value: "cookieKey=cookie1value",
                    });
                },
            },
            {
                statement: "Should be getting null if key is not found in cookie",
                key: "cookieKey",
                storageType: "COOKIE",
                results: null,
                mockStorage: () => {
                    Object.defineProperty(window.document, "cookie", {
                        writable: true,
                        value: "",
                    });
                },
            },
            {
                statement: "Should be able to get local storage with specific key",
                key: "localStorageKey",
                storageType: "LOCAL",
                results: "localStorageValue",
                mockStorage: () => {
                    (global as any).localStorage.setItem("localStorageKey", "localStorageValue");
                },
            },
            {
                statement: "Should be getting null if key is not found in local storage",
                key: "localStorage3Key",
                storageType: "LOCAL",
                results: null,
                mockStorage: () => {
                    (global as any).localStorage.setItem("localStorage2Key", "localStorageValue");
                },
            },
            {
                statement: "Should be able to get session storage with specific key",
                key: "sessionStorageKey",
                storageType: "SESSION",
                results: "sessionStorageValue",
                mockStorage: () => {
                    (global as any).sessionStorage.setItem("sessionStorageKey", "sessionStorageValue");
                },
            },
            {
                statement: "Should be getting null if key is not found in session storage",
                key: "sessionStorage3Key",
                storageType: "SESSION",
                results: null,
                mockStorage: () => {
                    (global as any).sessionStorage.setItem("sessionStorage2Key", "sessionStorageValue");
                },
            },
        ];
        testCases.map((testCase: GetItemMethodTestCase) => {
            it(testCase.statement, () => {
                testCase.mockStorage();
                const newStorageManagment: StorageManagement = new StorageManagement(testCase.storageType);
                expect(newStorageManagment.getItem(testCase.key)).toBe(testCase.results);
            });
        });
    });

    describe("removeItem method", () => {
        beforeEach(() => {
            (global as any).localStorage = new LocalSessionStorageMock();
            (global as any).sessionStorage = new LocalSessionStorageMock();
        });
        const testCases: Array<RemoveItemMethodTestCase> = [
            {
                statement: "Should be able to remove cookies with specific key",
                key: "cookieKey",
                storageType: "COOKIE",
                results: "cookieKey=; max-age=-1",
                document: () => document.cookie,
                mockStorage: () => {
                    Object.defineProperty(window.document, "cookie", {
                        writable: true,
                        value: "cookieKey=cookie1value",
                    });
                },
            },
            {
                statement: "Should be not able to remove cookies if key is not found in cookie",
                key: "cookieKey",
                storageType: "COOKIE",
                results: "cookie3Key=cookie1value",
                document: () => document.cookie,
                mockStorage: () => {
                    Object.defineProperty(window.document, "cookie", {
                        writable: true,
                        value: "cookie3Key=cookie1value",
                    });
                },
            },
            {
                statement: "Should be able to remove local storage with specific key",
                key: "localStorageKey",
                storageType: "LOCAL",
                results: null,
                document: () => (global as any).localStorage.getItem("localStorageKey"),
                mockStorage: () => {
                    (global as any).localStorage.setItem("localStorageKey", "localStorageValue");
                },
            },
            {
                statement: "Should be not able to remove local storage if key is not found in local storage",
                key: "localStorage3Key",
                storageType: "LOCAL",
                results: "localStorageValue",
                document: () => (global as any).localStorage.getItem("localStorage2Key"),
                mockStorage: () => {
                    (global as any).localStorage.setItem("localStorage2Key", "localStorageValue");
                },
            },
            {
                statement: "Should be able to remove session storage with specific key",
                key: "sessionStorageKey",
                storageType: "SESSION",
                results: null,
                document: () => (global as any).sessionStorage.getItem("sessionStorageKey"),
                mockStorage: () => {
                    (global as any).sessionStorage.setItem("sessionStorageKey", "sessionStorageValue");
                },
            },
            {
                statement: "Should be not able to remove session storage if key is not found in session storage",
                key: "sessionStorage3Key",
                storageType: "SESSION",
                results: "sessionStorageValue",
                document: () => (global as any).sessionStorage.getItem("sessionStorage2Key"),
                mockStorage: () => {
                    (global as any).sessionStorage.setItem("sessionStorage2Key", "sessionStorageValue");
                },
            },
        ];
        testCases.map((testCase: RemoveItemMethodTestCase) => {
            it(testCase.statement, () => {
                testCase.mockStorage();
                const newStorageManagment: StorageManagement = new StorageManagement(testCase.storageType);
                newStorageManagment.removeItem(testCase.key);
                expect(testCase.document()).toBe(testCase.results);
            });
        });
    });

    describe("clear method", () => {
        beforeEach(() => {
            (global as any).localStorage = new LocalSessionStorageMock();
            (global as any).sessionStorage = new LocalSessionStorageMock();
        });
        const testCases: Array<ClearMethodTestCase> = [
            {
                statement: "Should be able to remove cookies with specific key",
                storageType: "COOKIE",
                results: "cookieKey=; max-age=-1",
                document: () => document.cookie,
                mockStorage: () => {
                    Object.defineProperty(window.document, "cookie", {
                        writable: true,
                        value: "cookieKey=cookie1value",
                    });
                },
            },
            {
                statement: "Should be able to remove local storage with specific key",
                storageType: "LOCAL",
                results: "",
                document: () => Object.keys((global as any).localStorage).toString(),
                mockStorage: () => {
                    (global as any).localStorage.setItem("localStorageKey", "localStorageValue");
                },
            },
            {
                statement: "Should be able to remove session storage with specific key",
                storageType: "SESSION",
                results: "",
                document: () => Object.keys((global as any).sessionStorage).toString(),
                mockStorage: () => {
                    (global as any).sessionStorage.setItem("sessionStorageKey", "sessionStorageValue");
                },
            },
        ];
        testCases.map((testCase: ClearMethodTestCase) => {
            it(testCase.statement, () => {
                testCase.mockStorage();
                const newStorageManagment: StorageManagement = new StorageManagement(testCase.storageType);
                newStorageManagment.clear();
                expect(testCase.document()).toBe(testCase.results);
            });
        });
    });

    describe("keys method", () => {
        beforeEach(() => {
            (global as any).localStorage = new LocalSessionStorageMock();
            (global as any).sessionStorage = new LocalSessionStorageMock();
        });
        const testCases: Array<KeysMethodTestCase> = [
            {
                statement: "Should be able to get all keys of cookies",
                storageType: "COOKIE",
                results: "cookieKey,cookie2key",
                mockStorage: () => {
                    Object.defineProperty(window.document, "cookie", {
                        writable: true,
                        value: "cookieKey=cookie1value; cookie2key=cookievalue",
                    });
                },
            },
            {
                statement: "Should be able to get all keys of local storage",
                storageType: "LOCAL",
                results: "localStorageKey,localStorage2Key",
                mockStorage: () => {
                    (global as any).localStorage.setItem("localStorageKey", "localStorageValue");
                    (global as any).localStorage.setItem("localStorage2Key", "localStorageValue");
                },
            },
            {
                statement: "Should be able to get all keys of session storage",
                storageType: "SESSION",
                results: "sessionStorageKey,sessionStorage2Key",
                mockStorage: () => {
                    (global as any).sessionStorage.setItem("sessionStorageKey", "sessionStorageValue");
                    (global as any).sessionStorage.setItem("sessionStorage2Key", "sessionStorageValue");
                },
            },
        ];
        testCases.map((testCase: KeysMethodTestCase) => {
            it(testCase.statement, () => {
                testCase.mockStorage();
                const newStorageManagment: StorageManagement = new StorageManagement(testCase.storageType);
                expect(newStorageManagment.keys().toString()).toBe(testCase.results);
            });
        });
    });

    describe("key method", () => {
        beforeEach(() => {
            (global as any).localStorage = new LocalSessionStorageMock();
            (global as any).sessionStorage = new LocalSessionStorageMock();
        });
        const testCases: Array<KeyMethodTestCase> = [
            {
                statement: "Should be able to get key of cookie with valid index",
                storageType: "COOKIE",
                index: 0,
                results: "cookieKey",
                mockStorage: () => {
                    Object.defineProperty(window.document, "cookie", {
                        writable: true,
                        value: "cookieKey=cookie1value; cookie2key=cookievalue",
                    });
                },
            },
            {
                statement: "Should be not able to get key of cookie with invalid index",
                storageType: "COOKIE",
                index: 2,
                results: undefined,
                mockStorage: () => {
                    Object.defineProperty(window.document, "cookie", {
                        writable: true,
                        value: "cookieKey=cookie1value; cookie2key=cookievalue",
                    });
                },
            },
            {
                statement: "Should be able to get key of local storage with valid index",
                storageType: "LOCAL",
                results: "localStorageKey",
                index: 0,
                mockStorage: () => {
                    (global as any).localStorage.setItem("localStorageKey", "localStorageValue");
                    (global as any).localStorage.setItem("localStorage2Key", "localStorageValue");
                },
            },
            {
                statement: "Should be not able to get key of local storage with invalid index",
                storageType: "LOCAL",
                results: undefined,
                index: 2,
                mockStorage: () => {
                    (global as any).localStorage.setItem("localStorageKey", "localStorageValue");
                    (global as any).localStorage.setItem("localStorage2Key", "localStorageValue");
                },
            },
            {
                statement: "Should be able to get key of session storage with valid index",
                storageType: "SESSION",
                results: "sessionStorageKey",
                index: 0,
                mockStorage: () => {
                    (global as any).sessionStorage.setItem("sessionStorageKey", "sessionStorageValue");
                    (global as any).sessionStorage.setItem("sessionStorage2Key", "sessionStorageValue");
                },
            },
            {
                statement: "Should be not able to get key of session storage with invalid index",
                storageType: "SESSION",
                results: undefined,
                index: 2,
                mockStorage: () => {
                    (global as any).sessionStorage.setItem("sessionStorageKey", "sessionStorageValue");
                    (global as any).sessionStorage.setItem("sessionStorage2Key", "sessionStorageValue");
                },
            },
        ];
        testCases.map((testCase: KeyMethodTestCase) => {
            it(testCase.statement, () => {
                testCase.mockStorage();
                const newStorageManagment: StorageManagement = new StorageManagement(testCase.storageType);
                expect(newStorageManagment.key(testCase.index)).toBe(testCase.results);
            });
        });
    });
});
