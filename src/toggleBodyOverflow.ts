/**
 * Inserts a class into the body tag to disable overflow to avoid background scrolling
 * @example This can be used with a modal component
 * @param {boolean} toggle The value of the modal toggle
 * @note It inserts the class `overflow-hidden` which is a **bootstrap** class.
 * If you are not using bootstrap, please make sure that the class is defined with `overflow: hidden;`
 */
export function toggleBodyOverflow(toggle: boolean): void {
    const className: string = "overflow-hidden";
    const body: HTMLBodyElement = document.getElementsByTagName("body").item(0) as HTMLBodyElement;
    if (toggle !== undefined) {
        if (toggle && !body.classList.contains(className)) {
            body.classList.add(className);
        } else if (!toggle && body.classList.contains(className)) {
            body.classList.remove(className);
        }
    } else {
        console.warn("updateHTMLBodyWhenModalToggles called with invalid toggle");
    }
}
