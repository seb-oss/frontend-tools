/**
 * Finds all tab enabled child elements and returns them in an array
 * @param {HTMLElement} element The parent native element
 * @return {Array<HTMLElement>} An array of tab enabled native elements, an empty array if none is found.
 */
export function findAllTabEnabledElements(element: HTMLElement): Array<HTMLElement> {
    const tabEnabledElements: Array<HTMLElement> = [];
    if (element && element.hasChildNodes && element.hasChildNodes()) {
        element.childNodes.forEach((child: HTMLElement) => {
            /** Undefined if it's not set, -1 if it's not tab enabled */
            if (typeof child.tabIndex === "number" && child.tabIndex !== -1) {
                tabEnabledElements.push(child);
            }
            /** Recursively check the rest of the nested children */
            if (child.hasChildNodes()) {
                tabEnabledElements.push(...findAllTabEnabledElements(child));
            }
        });
    }
    return tabEnabledElements;
}
