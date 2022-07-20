export interface ToCurrencyOptions {
    /** The thousand separator, default is a comma `,` */
    separator?: string;
    /** The decimal point symbol, default is a dot `.` */
    decimalSymbol?: string;
    /** Whether to show the decimal places or not, default is `true` */
    showDecimals?: boolean;
    /** The number of decimals places to show, default is `2` */
    numOfDecimals?: number;
}

/**
 * Formats a number or a string number to a currency format
 * @param {number} value raw number value
 * @param {ToCurrencyOptions} options You can control the sperator, radix, decimals visibility and number of decimal places using these options
 * @returns {string} The formatted currency string
 */
export function toCurrency(
    value: number | string,
    options: ToCurrencyOptions = {}
): string {
    let amount: string = "0";
    const format = (val: number): string => {
        let num: number;
        let cents: number;
        if (val - Math.floor(val) === 0) {
            num = val;
        } else {
            num = Math.floor(val);
            if (options?.showDecimals !== false) {
                cents = Number(
                    (val - Math.floor(val))
                        .toFixed(options?.numOfDecimals || 2)
                        .replace("0.", "")
                );
            }
        }
        const list: Array<string> = String(num).split("");
        const newList: Array<string> = [];
        list.map((item: string, index: number) => {
            if ((list.length - (index + 1) || 1) % 3 === 0) {
                newList.push(item);
                newList.push(options?.separator || ",");
            } else {
                newList.push(item);
            }
        });
        amount = newList.join("");
        return (
            amount + (cents ? `${options?.decimalSymbol || "."}${cents}` : "")
        );
    };
    if (typeof value === "number") {
        return format(value);
    } else if (typeof value === "string" && !isNaN(Number(value))) {
        return format(Number(value));
    } else {
        return "";
    }
}
