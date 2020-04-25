import { findAllTabEnabledElements } from ".";

describe("Util: findAllTabEnabledElements", () => {
    it("Should return empty array when nothing is found", () => {
        const parent: HTMLDivElement = document.createElement("div");
        document.body.appendChild(parent);
        expect(findAllTabEnabledElements(parent)).toHaveLength(0);
    });

    it("Should find all tab enabled elements", () => {
        const parent: HTMLDivElement = document.createElement("div");
        const anchor: HTMLAnchorElement = document.createElement("a");
        anchor.href = "http://example.com";
        anchor.innerText = "example";
        parent.appendChild(anchor)
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("p"));
        parent.querySelector("div").appendChild(document.createElement("button"));
        parent.querySelector("div").appendChild(document.createElement("input"));
        parent.querySelector("div").appendChild(document.createElement("p"));
        parent.querySelector("div").appendChild(document.createElement("span"));
        document.body.appendChild(parent);
        expect(findAllTabEnabledElements(parent)).toHaveLength(3);
    });

    it("Should not crash when wrong element is passed", () => {
        expect(findAllTabEnabledElements({} as any)).toHaveLength(0);
        expect(findAllTabEnabledElements(null)).toHaveLength(0);
    });
});
