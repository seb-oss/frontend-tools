import { CookieStorage } from "../src/cookieStorage";

type KeyValuePair = { key: string, value: string };

describe("CookieStorage", () => {
    // const test = { key: "TEST", value: "123" };
    const storage: CookieStorage = new CookieStorage();

    beforeEach(() => document = new Document());

    describe("Testing internal public methods", () => {
        const testCases: Array<KeyValuePair> = [
            { key: "test1", value: "first-test" },
            { key: "test2", value: "second-test" },
            { key: "test3", value: "third-test" },
        ];

        function setAllTestCases() {
            testCases.map((item: KeyValuePair) => storage.setItem(item.key, item.value));
        }

        describe("- setItem", () => {
            it("Should set an item to the cookie and return true if successful", () => {
                const result: boolean = storage.setItem(testCases[0].key, testCases[0].value);
                expect(document.cookie).toContain(`${testCases[0].key}=${testCases[0].value}`);
                expect(result).toBeTruthy();
            });

            it("Should return false if an invalid key is passed", () => {
                expect(storage.setItem("", "test")).toBeFalsy();
            });

            it("Should allow setting a cookie with options", () => {
                const expires: Date = new Date(((new Date()).getFullYear() + 2).toString()); // Two years from now
                const result: boolean = storage.setItem("TEST", "TESTING", { expires, maxAge: 10 * 60 });
                expect(result).toBeTruthy();
            });

            it("Should accept expiry as a number of days and set it to year 9999 if Infinity is passed as a value", () => {
                storage.setItem("TEST", "TESTING", { expires: new Date() });
            });

            it("Should not crash if options is set to null", () => {
                expect(storage.setItem("KEY", "VALUE", null)).toBeTruthy();
            });
        });

        describe("- getItem", () => {
            it("Should get an item from the cookie", () => {
                storage.setItem(testCases[0].key, testCases[0].value);
                expect(storage.getItem(testCases[0].key)).toEqual(testCases[0].value);
                expect(storage.getItem("")).toBeNull();
            });

            it("Should return null if an invalid key is passed", () => {
                expect(storage.getItem("\\")).toBeNull();
            });
        });

        describe("- removeItem", () => {
            it("Should remove an item from the cookie and return true if successful", () => {
                setAllTestCases();
                const result: boolean = storage.removeItem("test2");
                expect(document.cookie).not.toContain("test2");
                expect(document.cookie.length).not.toEqual(0);
                expect(result).toBeTruthy();
            });

            it("Should only remove an item if it exists and return true if the given key doesn't exists in the cookie", () => {
                expect(storage.removeItem("ABCD")).toBeTruthy();
            });
        });

        describe("- hasItem", () => {
            it("Should return true if a given key exists in the cookie", () => {
                setAllTestCases();
                testCases.map((item: KeyValuePair) => expect(storage.hasItem(item.key)).toBeTruthy());
            });

            it("Should return false if there an invalid key is passed", () => {
                setAllTestCases();
                expect(storage.hasItem("")).toBeFalsy();
            });
        });

        describe("- clear", () => {
            it("Should clear the cookie", () => {
                setAllTestCases();
                storage.clear();
                expect(document.cookie).toEqual("");
            });

            it("Should be able to clear a cookie with no value", () => {
                document.cookie = "TEST";
                storage.clear();
                expect(document.cookie).toEqual("");
            });
        });

        describe("- keys", () => {
            it("Should return the keys of the items in the cookie", () => {
                setAllTestCases();
                const keys: Array<string> = testCases.map((item: KeyValuePair) => item.key);
                expect(storage.keys()).toEqual(keys);
                expect(storage.keys().length).toEqual(testCases.length);
            });
        });

        describe("- key", () => {
            it("Should return the key of the given index (if exists)", () => {
                setAllTestCases();
                expect(storage.key(0)).toEqual(testCases[0].key);
            });
        });

        describe("- length (getter)", () => {
            it("Should return the length of the items in the cookie", () => {
                setAllTestCases();
                expect(storage.length).toEqual(testCases.length);
            });
        });
    });
});
