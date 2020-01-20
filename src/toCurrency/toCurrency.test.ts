import { toCurrency } from ".";

describe("Util: toCurrency", () => {
    it("Should format number to currency", () => {
        expect(toCurrency(1000)).toEqual("1,000");
        expect(toCurrency("1000")).toEqual("1,000");
        expect(toCurrency(1000.222)).toEqual("1,000.22");
        expect(toCurrency("1000.222")).toEqual("1,000.22");
    });

    it("Should allow passing a custom separator and radix", () => {
        expect(toCurrency(1000.22, { separator: " ", radix: "," })).toEqual("1 000,22");
        expect(toCurrency("1000.22", { separator: " ", radix: "," })).toEqual("1 000,22");
    });

    it("Should allow hiding decimals", () => {
        expect(toCurrency(1000.22, { showDecimals: true })).toEqual("1,000");
        expect(toCurrency("1000.22", { showDecimals: true })).toEqual("1,000");
    });

    it("Should allow specifying the number of decimal places", () => {
        expect(toCurrency(1000.123456, { numOfDecimals: 4 })).toEqual("1,000.1235");
        expect(toCurrency("1000.123456", { numOfDecimals: 4 })).toEqual("1,000.1235");
    });

    it("Should return empty string if value passed is not a string or number", () => {
        expect(toCurrency(new Date() as any)).toEqual("");
    });
});
