import { toCurrency } from ".";

// describe("Util: toCurrency", () => {
//     it("Should format number to currency", () => {
//         expect(toCurrency(1000)).toEqual("1,000");
//         expect(toCurrency("1000")).toEqual("1,000");
//         expect(toCurrency(1000.222)).toEqual("1,000.22");
//         expect(toCurrency("1000.222")).toEqual("1,000.22");
//     });

//     it("Should allow passing a custom separator and radix", () => {
//         expect(toCurrency(1000.22, { separator: " ", decimalSymbol: "," })).toEqual("1 000,22");
//         expect(toCurrency("1000.22", { separator: " ", decimalSymbol: "," })).toEqual("1 000,22");
//     });

//     it("Should allow hiding decimals", () => {
//         expect(toCurrency(1000.22, { showDecimals: false })).toEqual("1,000");
//         expect(toCurrency(1000.22, { showDecimals: true })).toEqual("1,000.22");
//         expect(toCurrency("1000.22", { showDecimals: true })).toEqual("1,000.22");
//     });

//     it("Should allow specifying the number of decimal places", () => {
//         expect(toCurrency(1000.123456, { numOfDecimals: 4 })).toEqual("1,000.1235");
//         expect(toCurrency("1000.123456", { numOfDecimals: 4 })).toEqual("1,000.1235");
//     });

//     it("Should return empty string if value passed is not a string or number", () => {
//         expect(toCurrency(new Date() as any)).toEqual("");
//     });

//     it("Should not crash when options are passed undefined", () => {
//         expect(toCurrency(1000.22, null)).toBeDefined();
//     });
// });

describe("Util: toCurrency with locale", () => {
    it("should format number in english format without currency signs", () => {
        expect(toCurrency(1000.123, {})).toEqual("1,000.123");
    });
    it("should format number in swedish format without currency signs", () => {
        expect(toCurrency(1000.123, {}, "sv-SE")).toBe("1 000,123");
    });
});
