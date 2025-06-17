// src/interfaces/ApiRoutesInterfaces.ts

/**
 * ApiRoutesInterface represents the structure for an API route definition.
 * It outlines the essential fields required to describe an API endpoint,
 * including its identifier, alias, route, HTTP method, and associated parameters.
 *
 * Optional fields are included for providing additional descriptive information.
 *
 * @interface ApiRoutesInterface
 *
 * @property {number} [id] - The optional unique identifier for the API route.
 * @property {string} alias - A human-readable alias for the API route.
 * @property {string} route - The path or URL of the API endpoint.
 * @property {string} method - The HTTP method associated with the API endpoint (e.g., GET, POST, PUT, DELETE).
 * @property {string} parameters - A list or structure containing the required or optional parameters for the endpoint.
 * @property {string} [description] - An optional detailed explanation of the purpose and behavior of the route.
 * @property {string} [comment] - An optional field for any additional notes or comments about the API route.
 */

export interface ApiRoutesInterface {
    id?: number;
    alias: string;
    route: string;
    method: string;
    parameters: string;
    description?: string;
    comment?: string;
}