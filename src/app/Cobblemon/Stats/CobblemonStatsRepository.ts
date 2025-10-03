import {Repository} from "../../../otterly/abstractClass/repositories/Repository";
import {CobblemonStatsInterface} from "./CobblemonStatsInterface";

/**
 * CobblemonStatsRepository is a repository class for managing player statistics data.
 * It extends the base Repository class with specific operations designed for handling
 * Cobblemon player data. This repository is primarily used to interact with a database
 * table that holds player information.
 *
 * @extends Repository<CobblemonStatsInterface>
 */

export class CobblemonStatsRepository extends Repository<CobblemonStatsInterface> {

    constructor() {
        super("joueurs_pokemon");

    }

    // Obtenir l'ensemble des statistiques Cobblemon
    async getAll(): Promise<CobblemonStatsInterface[]> {
        return await this.findAll();
    }

    // Obtenir les statistiques Cobblemon par joueur_uuid
    async getByCompteId(uid: string): Promise<CobblemonStatsInterface[]> {
        return await this.query(`SELECT * FROM ${this.tableName} WHERE joueur_uuid = ?`, [uid]);
    }
}