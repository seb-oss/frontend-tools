import { FormValidator } from "../src/FormValidator";

describe("Form Validator", () => {
    const testModel: any = { a: 1, b: "test" };

    it("Should do something", () => {
        const validator: FormValidator<{ a: number, b: string }> = new FormValidator(testModel);
        expect(validator).toBeDefined();
    });
});
