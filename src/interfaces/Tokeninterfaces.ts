// src/interfaces/Tokeninterfaces.ts

/**
 * Represents a token structure for authentication or authorization purposes.
 *
 * @interface TokenInterface
 *
 * @property {number} id - The unique identifier of the token.
 * @property {string} utilisateur - The username or identifier of the user associated with the token.
 * @property {string} [role] - An optional role associated with the user or token.
 * @property {string} createdAt - The timestamp when the token was created.
 * @property {string} [token] - An optional token string used for authentication or verification.
 */

export interface TokenInterface {
    id: number;
    utilisateur: string;
    role?: string;
    createdAt: string;
    token?: string;
}