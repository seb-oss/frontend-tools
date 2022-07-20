/**
 * Inserts values in a string
 * This is mostly used to insert values in a translation message
 * @param {string} str The string that contains the variables
 * @param {object} params The params to insert in the string message
 * @param {string} symbol The symbol to look for to insert the params in the string message. Default is `@` symbol. You can also pass an array of an openning and closing like this `["{{", "}}"]`
 * @returns The replaced string
 */
export function stringInsert(
    str: string,
    params: any,
    symbol: string | [string, string] = "@"
): string {
    if (str && typeof str === "string") {
        for (const key in params) {
            str = str.replace(
                new RegExp(
                    `${
                        Array.isArray(symbol) ? symbol[0] || "@" : symbol
                    }${key}${
                        Array.isArray(symbol) ? symbol[1] || "@" : symbol
                    }`,
                    "g"
                ),
                String(params[key])
            );
        }
    }
    return str;
}
