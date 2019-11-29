/**
 * Get a deep copy of an object
 * @param obj any complex object
 * @returns {Object} The generated object
 */
export function deepCopy<T = any>(obj, hash = new WeakMap()): T {
    if (Object(obj) !== obj) {// primitives
        return obj;
    }
    if (obj instanceof Set) { // See note about this!
        return new Set(obj) as any;
    }
    if (hash.has(obj)) { // cyclic reference
        return hash.get(obj);
    }
    const result = obj instanceof Date ? new Date(obj.getTime())
        : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
            : obj.constructor ? new obj.constructor()
                : Object.create(null);
    hash.set(obj, result);
    console.log(obj, hash);
    if (obj instanceof Map) {
        Array.from(obj, ([key, val]) => result.set(key, deepCopy(val, hash)));
    }
    return Object.assign(result, ...Object.keys(obj).map((key) => ({ [key]: deepCopy(obj[key], hash) })));
}
