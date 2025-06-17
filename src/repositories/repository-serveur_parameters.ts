// src/repositories/repository-serveur_parameters.ts

import { ServeurParametersInterface } from "../interfaces/ServeurParametersInterfaces";
import { Repository } from "./Repository";

/**
 * RepositoryServeurParameters is a class that extends the Repository for managing
 * operations related to serveur parameters. It provides methods for retrieving
 * information from a database table.
 */

export class RepositoryServeurParameters extends Repository<ServeurParametersInterface> {
    constructor() {
        super("serveurs_parameters");
    }

    // Méthode pour récupérer l'information complète de la table 
    async getAllParameters(): Promise<ServeurParametersInterface[]> {
        const parameters = await super.findAll();
        return parameters;
    }

    // Méthode pour récupérer seulement la première ligne de la table
    async getFirstParameters(): Promise<ServeurParametersInterface | null> {
        const parameters = await super.findFirst();
        return parameters;
    }

    // Méthode pour récupérer uniquement les ID des serveurs primaire et secondaire
    async getServeursId(): Promise<ServeurParametersInterface | null> {
        try {
            const rows: ServeurParametersInterface[] = await super.query(
                `SELECT id_serv_primaire, id_serv_secondaire FROM ${this.tableName}`
            );

            if (rows && rows.length > 0) {
                return rows[0];
            }

            return null;
        } catch (error) {
            console.error("Erreur lors de la récupération des IDs de serveurs :", error);
            return null;
        }
    }

}
