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
        super("stats_cobblemon");

    }

    // Obtenir l'ensemble des statistiques Cobblemon
    async getAll(): Promise<CobblemonStatsInterface[]> {
        return await this.query(`SELECT s.*, j.compte_id
                                 FROM ${this.tableName} s
                                          INNER JOIN joueurs_stats j ON s.joueurs_stats_id = j.id`);
    }

    // Obtenir les statistiques Cobblemon par compte_id
    async getByCompteId(uid: string): Promise<CobblemonStatsInterface[]> {
        return await this.query(`SELECT s.*, j.compte_id
                                 FROM ${this.tableName} s
                                          INNER JOIN joueurs_stats j ON s.joueurs_stats_id = j.id
                                 WHERE j.compte_id = ?`, [uid]);
    }
}