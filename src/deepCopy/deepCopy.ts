/**
 * Get a deep copy of an object
 * @param obj any complex object
 * @returns {Object} The generated object
 */
export function deepCopy<T = any>(obj: T, hash = new WeakMap()): T {
    if (Object(obj) !== obj) { // Primitive type
        return obj;
    } else if (obj instanceof Set) { // Setter
        return new Set(obj) as any;
    } else if (hash.has(obj as any)) { // Cyclic reference
        return hash.get(obj as any);
    } else {
        let result: any = Object.create(null);

        if (obj instanceof Date) { // Date object
            result = new Date(obj.getTime());
        } else if (obj instanceof RegExp) { // Regular expression
            result = new RegExp(obj.source, obj.flags);
        } else if (obj.constructor) {
            result = isSymbol(obj) ? obj : new (obj as any).constructor(); // symbol should be referenced only
        }

        hash.set(obj as any, result);

        if (obj instanceof Map) { // Map object
            Array.from(obj, ([key, val]: [any, any]) => result.set(key, deepCopy(val, hash)));
        }
        return Object.assign(result, ...Object.keys(obj).map((key: string) => ({ [key]: deepCopy(obj[key], hash) })));
    }
}

/**
 * check if the variable is a symbol
 * @param x obj or any datatype
 */
function isSymbol (x: any) {
    return typeof x === "symbol" ||
    typeof x === "object" && Object.prototype.toString.call(x) === "[object Symbol]";
}
