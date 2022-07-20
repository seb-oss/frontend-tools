require("jsdom-global/register");

global.URL.createObjectURL = jest.fn();

global.URL.revokeObjectURL = jest.fn();
