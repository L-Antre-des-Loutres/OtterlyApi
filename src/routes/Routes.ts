// src/routes/Route.ts

import { ApiRoutesInterface } from "../interfaces/ApiRoutesInterfaces";
import { RepositoryApiRoutes } from "../repositories/repository-api_routes";

/**
 * Represents an API route with its associated metadata and provides functionality to manage and register routes.
 *
 * This class implements the `ApiRoutesInterface`.
 * It is designed to define and manage API endpoints with attributes such as route path, HTTP method, alias, parameters,
 * as well as optional attributes for comments and descriptions.
 *
 * The class also provides a static method to register a collection of routes by appending a base URL and type identifier
 * to the route, followed by storing the route in a repository.
 *
 * - `route`: The path or URL of the API endpoint.
 * - `method`: The HTTP method associated with the API endpoint (e.g., GET, POST, PUT, DELETE).
 * - `alias`: A human-readable alias for the API route.
 * - `parameters`: A list or structure containing the required or optional parameters for the endpoint.
 * - `comment`: An optional field for any additional notes or comments about the API route.
 * - `description`: An optional detailed explanation of the purpose and behavior of the route.
 * - `RegisterRoutes`: Registers a collection of routes by appending a base URL and type identifier to the route, followed by storing the route in a repository.
 */

export class Routes implements ApiRoutesInterface {

    id?: number;
    alias: string;
    route: string;
    method: string;
    parameters: string;
    comment?: string;
    description?: string;

    constructor(route: string, method: string, alias: string, parameters: string) {
        this.route = route;
        this.method = method;
        this.alias = alias;
        this.parameters = parameters;
    }

    private static readonly repository = new RepositoryApiRoutes();

    // Enregistrement des routes
    static registerRoutes(routes: Routes[], type : string): void {
        routes.forEach(route => {
            route.route =`${process.env.API_URL}/${type}${route.route}`;
            Routes.repository.addRoute(route);
        });
    }
}
