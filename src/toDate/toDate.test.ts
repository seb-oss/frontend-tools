import { toDate } from ".";

describe("Util: toDate", () => {
    it("Should covert a valid date string or a date to a date object", () => {
        expect(toDate("2015-01-01") instanceof Date).toBeTruthy();
        expect(toDate(new Date()) instanceof Date).toBeTruthy();
    });

    it("Should accept a number input and convert to a date object", () => {
        expect(toDate(Date.now()) instanceof Date).toBeTruthy();
    });

    it("Should accept array of numbers input and convert to a date object", () => {
        expect(toDate([2010, 0, 1]) instanceof Date).toBeTruthy();
        expect(toDate([2010, 0, 1, 0, 0, 0, 0]) instanceof Date).toBeTruthy();
    });

    it("Should reject array of string as input and return null", () => {
        expect(toDate(["a", "b", "c"] as any)).toBeNull();
    });

    it("Should reject unsupported input and return null", () => {
        expect(toDate({} as any)).toBeNull();
    });

    it("Should inform user about depracated second param", () => {
        expect(toDate(new Date(), "test") instanceof Date).toBeTruthy();
    });

    it("Should return null if value passed is null or undefined", () => {
        expect(toDate(null)).toBeNull();
    });

    it("Should return null when wrong date string is passed", () => {
        expect(toDate("not a date")).toBeNull();
    });

    it("Should convert to date even if inputFormat is not passed", () => {
        const date: Date = toDate("2020-02-01T00:00:00.000+00:00");
        expect(date.getFullYear()).toEqual(2020);
        expect(date.getMonth()).toEqual(1);
        expect(date.getDate()).toEqual(1);
    });
});
