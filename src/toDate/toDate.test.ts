import { toDate } from ".";

describe("Util: toDate", () => {
    it("Should covert a string date to a date object", () => {
        expect(toDate("2015-01-01") instanceof Date).toBeTruthy();
        expect(toDate(new Date()) instanceof Date).toBeTruthy();
    });

    it("Should return null if value passed is null or undefined", () => {
        expect(toDate(null)).toBeNull();
    });

    it("Should format the date correctly with inputFormat", () => {
        const date: Date = toDate("2015-02-01", "YYYY-MM-DD");
        const date2: Date = toDate("2015-02-01", "YYYY-DD-MM");
        expect(date.getMonth()).toBe(1);
        expect(date.getDate()).toBe(1);
        expect(date2.getMonth()).toBe(0);
        expect(date2.getDate()).toBe(2);
    });

    it("Should return null when wrong date string is passed", () => {
        expect(toDate("not a date")).toBeNull();
    });
});
