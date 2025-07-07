// src/routes/Route.ts
import { ApiRoutesInterface } from "../interfaces/ApiRoutesInterfaces";
import {RepositoryApiRoutes} from "../repositories/repository-api_routes";

/**
 * Classe de base pour les routes
 * @classdesc Classe de base pour les routes
 * @author matheo-1712
 **/

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
    static registerRoutes(routes: Routes[], type? : string): void {
        routes.forEach(route => {
            if (type) route.route = `${process.env.API_URL}/${type}${route.route}`;
            else route.route =`${process.env.API_URL}${route.route}`
            Routes.repository.addRoute(route);
        });
    }
}