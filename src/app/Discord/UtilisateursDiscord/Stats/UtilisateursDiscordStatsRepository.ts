import {Repository} from "../../../../otterly/abstractClass/repositories/Repository";
import {UtilisateursDiscordStatsInterface} from "./UtilisateurDiscordStatsInterface";

/**
 * Repository class for interacting with the utilisateurs_discord_stats database table.
 * Extends the base Repository to manage UtilisateursDiscordStatsInterface entities.
 */

export class UtilisateursDiscordStatsRepository extends Repository<UtilisateursDiscordStatsInterface> {
    constructor() {
        super("utilisateurs_discord_stats");
    }

    /**
     * Fetches a record from the database for a specific user based on the provided user ID.
     *
     * @param {number} id - The unique identifier of the user whose data is to be retrieved.
     * @return {Promise<UtilisateursDiscordStatsInterface>} A promise that resolves to the result of the database query.
     */
    async getByUserId(id: number) {
        return await this.query(`SELECT *
                                 FROM ${this.tableName}
                                 WHERE id_utilisateur = ?`, [id]);
    }

    /**
     * Insertion d'un utilisateur dans la table utilisateurs_discord_stats'
     * @param data
     */
    async insert(data: Partial<UtilisateursDiscordStatsInterface>) {
        await this.save(data as UtilisateursDiscordStatsInterface)
    }

    /**
     * Updates an existing user record in the database.
     *
     * @param {Partial<UtilisateursDiscordStatsInterface>} data - An object containing the fields to update.
     * @param {number} id - The unique identifier of the user to be updated.
     * @return {Promise<any>} A promise that resolves with the result of the update operation.
     */
    async update(data: Partial<UtilisateursDiscordStatsInterface>, id: number) {
        return await this.query(`UPDATE ${this.tableName}
                                 SET ?
                                 WHERE id = ?`, [data, id]);
    }
}