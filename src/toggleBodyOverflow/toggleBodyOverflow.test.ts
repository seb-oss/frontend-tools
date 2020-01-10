import { toggleBodyOverflow } from ".";

describe("Toggle body overflow", () => {
    it("Should toggle overflow class for document body", () => {
        expect(document.body.classList.contains("overflow-hidden")).toBeFalsy();
        toggleBodyOverflow(true);
        expect(document.body.classList.contains("overflow-hidden")).toBeTruthy();
        toggleBodyOverflow(false);
        expect(document.body.classList.contains("overflow-hidden")).toBeFalsy();
    });
    it("Should not toggle class when toggle passed is undefined", () => {
        expect(document.body.classList.contains("overflow-hidden")).toBeFalsy();
        toggleBodyOverflow(undefined);
        expect(document.body.classList.contains("overflow-hidden")).toBeFalsy();
    });
    it("Should not toggle class when document body does not contain overflow-hidden class", () => {
        expect(document.body.classList.contains("overflow-hidden")).toBeFalsy();
        toggleBodyOverflow(false);
        expect(document.body.classList.contains("overflow-hidden")).toBeFalsy();
    });
});
