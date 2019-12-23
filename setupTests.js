require("raf/polyfill");
require("jsdom-global/register");
require("./tests/__mocks__/mutationObserverMock");
require("./tests/__mocks__/canvasMock");

function doNothing() {
    // nothing
}

function addListenerFun() {
    return {
        matches: false,
        addListener: () => { doNothing(); },
        removeListener: () => { doNothing(); },
        media: ""
    };
}

window.matchMedia = window.matchMedia || addListenerFun;
