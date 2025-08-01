// src/routes/Route.ts

import { Request, Response } from "express";
import { ApiRoutesInterface } from "../../ApiRoutes/ApiRoutesInterfaces";
import { RepositoryApiRoutes } from "../../ApiRoutes/ApiRoutesRepository";

/**
 * Represents API routes configuration with metadata and registration functionality.
 *
 * This class is used to define API routes, including their HTTP methods, aliases,
 * parameters, and additional optional details like comments and descriptions.
 *
 * Implements the `ApiRoutesInterface`.
 */

export abstract class Routes implements ApiRoutesInterface {
    id?: number;
    alias: string;
    route: string;
    method: string;
    parameters: string;
    comment?: string;
    description?: string;

    protected constructor(route: string, method: string, alias: string, parameters: string) {
        this.route = route;
        this.method = method;
        this.alias = alias;
        this.parameters = parameters;
    }

    private static readonly repository = new RepositoryApiRoutes();

    /**
     * Enregistre un tableau de routes dans le dépôt des routes API.
     */
    static registerRoutes(routes: Routes[], type?: string): void {
        routes.forEach(route => {
            if (type) {
                route.route = `${process.env.API_URL}/${type}${route.route}`;
            } else {
                route.route = `${process.env.API_URL}${route.route}`;
            }
            Routes.repository.addRoute(route).then(r => {
                console.log(r);
            });
        });
    }

    /**
     * Méthode utilitaire pour encapsuler des handlers Express dans un try/catch automatique.
     * Permet de capturer les erreurs et de renvoyer un statut HTTP 500 en cas de problème.
     *
     * @param handler Une fonction async de type Express (req, res) => Promise<void>
     * @param errorMessage Message d'erreur à retourner si l'exécution échoue.
     * @returns Une fonction Express sécurisée.
     */

    static safeHandler(
        handler: (req: Request, res: Response) => Promise<void>,
        errorMessage: string = "Une erreur interne est survenue."
    ) {
        return async (req: Request, res: Response) => {
            try {
                await handler(req, res);
            } catch (error) {
                console.error("Erreur dans le handler :", error);
                res.status(500).json({ error: errorMessage });
            }
        };
    }
}
