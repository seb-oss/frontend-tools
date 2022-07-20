import { toLocalDateString } from ".";

describe("Util: toLocalDateString", () => {
    it("Should return correct date", () => {
        const date: Date = new Date();
        const returned: string = toLocalDateString(date);
        const returnedDate: Date = new Date(returned);
        expect(typeof returned === "string").toBeTruthy();
        expect((returnedDate as any) !== "Invalid Date").toBeTruthy();
        expect(returnedDate.getFullYear()).toEqual(date.getFullYear());
        expect(returnedDate.getMonth()).toEqual(date.getMonth());
        expect(returnedDate.getDate()).toEqual(date.getDate());
        expect(returnedDate.getHours()).toEqual(0);
        expect(returnedDate.getMinutes()).toEqual(0);
        expect(returnedDate.getSeconds()).toEqual(0);
    });

    it("Should return string of the input if it's not a date", () => {
        expect(toLocalDateString({} as any)).toEqual("[object Object]");
    });
});
