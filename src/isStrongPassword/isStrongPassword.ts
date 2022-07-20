/**
 * Verifies a password strength
 * @param {string} newPassword The new password needed to be verified
 * @returns {boolean} True if the password is strong
 * @rules :
 * - Must be at least 8 characters long.
 * - Must include at least one uppercase character.
 * - Must include at least one lowercase character.
 * - Must include at least one number.
 */
export function isStrongPassword(newPassword: string): boolean {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/.test(
        newPassword
    );
}
