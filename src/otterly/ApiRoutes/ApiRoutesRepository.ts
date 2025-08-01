// src/repositories/repository-api_routes.ts

import { Repository } from "../abstractClass/repositories/Repository";
import {ApiRoutesInterface} from "./ApiRoutesInterfaces";

/**
 * Class representing repository-based operations for managing API routes in the database.
 * Extends the base `Repository` to provide specialized methods for API routes.
 * - `getRoutes`: Retrieves all API routes from the database.
 * - `addRoute`: Adds a new API route to the database.
 * - `updateRoute`: Updates an existing API route in the database.
 * - `getRouteByAlias`: Retrieves a route by its alias from the database.
 */

export class RepositoryApiRoutes extends Repository<ApiRoutesInterface> {
    constructor() {
        super("api_routes");
    }

    // Méthode pour récupérer les routes
    async getRoutes(): Promise<ApiRoutesInterface[]> {
        return this.findAll();
    }

    // Méthode pour ajouter une route
    async addRoute(route: ApiRoutesInterface): Promise<void> {
        try {
            // Vérification si la route existe déjà
            const existingRoute = await this.getRouteByAlias(route.alias);
            if (existingRoute) {
                await this.updateRoute(route);
            } else {
                await this.save(route);
                console.log(`🗒️  Route ${route.alias} enregistrée avec succès dans la base de données.`);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la route :", error);
        }
    }

    // Méthode pour mettre à jour une route par son alias
    async updateRoute(route: ApiRoutesInterface): Promise<void> {
        await this.query(`UPDATE api_routes SET route = ?, method = ?, parameters = ?, description = ?, comment = ? WHERE alias = ?`, [route.route, route.method, route.parameters, route.description, route.comment, route.alias]);
        // console.log(`🗒️  Route ${route.alias} mise à jour avec succès dans la base de données.`);
    }

    // Méthode pour obtenir une route par son alias
    async getRouteByAlias(alias: string): Promise<ApiRoutesInterface | null> {
        const results = await this.query(`SELECT * FROM api_routes WHERE alias = ?`, [alias]);
        return results.length > 0 ? results[0] : null;
    }
}