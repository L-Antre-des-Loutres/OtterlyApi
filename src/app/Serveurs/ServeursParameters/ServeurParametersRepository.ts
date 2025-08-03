import {Repository} from "../../../otterly/abstractClass/repositories/Repository";
import {ServeurParametersInterface} from "./ServeurParametersInterface";

/**
 * ServeurParametersRepository is a repository class that provides methods
 * to interact with the "serveurs_parameters" database table. It extends
 * the generic Repository class to perform operations specific to server parameters.
 */

export class ServeurParametersRepository extends Repository<ServeurParametersInterface> {
    constructor() {
        super("serveurs_parameters");
    }

    // Méthode pour récupérer l'information complète de la table
    async getAllParameters(): Promise<ServeurParametersInterface[]> {
        return await super.findAll();
    }

    // Méthode pour récupérer seulement la première ligne de la table
    async getFirstParameters(): Promise<ServeurParametersInterface | null> {
        return await super.findFirst();
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

    async updateActifServeur(serveurId: number): Promise<boolean> {
        try {
            // Attendre la résolution de la Promise
            const serveurPrimaire: ServeurParametersInterface | null = await this.getFirstParameters();

            // Vérifie que serveurPrimaire n'est pas null et que les ids correspondent
            if (serveurPrimaire && serveurId !== serveurPrimaire.id_serv_primaire) {
                await super.query(
                    `UPDATE ${this.tableName} SET id_serv_secondaire = ?`,
                    [serveurId]
                );
                // Renvoie true après la requête
                return true;
            }
            return false;
        } catch (error) {
            // Optionnel : tu peux logger l'erreur ici
            // console.error(error);
            return false;
        }
    }


}