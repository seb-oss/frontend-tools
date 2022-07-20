/**
 * Generates a random unique ID
 * @param {string} seed A seed to be inserted to the random ID to ensure further uniqueness
 * @returns {string} The generated random ID
 */
export function randomId(seed: string): string {
    return seed + String(Math.random() * 1000 + new Date().getTime());
}
