import {PalworldStatsInterface} from "./PalworldStatsInterface";
import {Repository} from "../../../otterly/abstractClass/repositories/Repository";

/**
 * Repository class for handling Palworld statistics.
 * This class provides methods to interact with the "stats_palworld" table.
 *
 * Extends:
 * Repository<PalworldStatsInterface>
 */

export class PalworldStatsRepository extends Repository<PalworldStatsInterface> {

    constructor() {
        super("stats_palworld");

    }

    async getAll() {
        return await this.findAll();
    }

    // Obtenir l'ensemble du temps de jeux par id de serveur
    async getGameTimeByServeurId(id: number) {
        return await this.query(`SELECT SUM(tmps_jeux) AS total_heure
                                 FROM ${this.tableName}
                                 WHERE serveur_id = ?`, [id]);
    }

    // Obtenir l'ensemble du temps de jeux (en heures)
    async getGameTime() {
        return await this.query(`SELECT SUM(tmps_jeux) AS total_heure
                                 FROM ${this.tableName}`);
    }
}