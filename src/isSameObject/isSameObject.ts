
/**
 * Compare if two objects are the same, returns true or false
 * @param type the comparison type
 * @param objectA the first object
 * @param objectB the second object to compare against
 */
export function isSameObject<T>(objectA: T, objectB: T, deep?: boolean): boolean {
    if (deep) {
        const objAKeys = Object.keys(objectA);
        const objBKeys = Object.keys(objectB);

        // first step, compare if the two keys length match
        if (objAKeys.length === objBKeys.length) {
            // step two, compare each value by key
            for (let i = 0; i < objAKeys.length; i++) {
                if (objectA[objAKeys[i]] !== objectB[objBKeys[i]]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    } else {
        return JSON.stringify(objectA) === JSON.stringify(objectB);
    }
}
