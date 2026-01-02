import db from "../../../../otterly/db";
import { Repository } from "../../../../otterly/abstractClass/repositories/Repository";
import { UtilisateursDiscordStatsInterface } from "./UtilisateurDiscordStatsInterface";

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
    /**
     * Insertion d'un utilisateur dans la table utilisateurs_discord_stats'
     * @param data
     */
    async insert(data: Partial<UtilisateursDiscordStatsInterface>) {
        console.log("UtilisateursDiscordStatsRepository: insert called with", JSON.stringify(data));

        data.id = data.id ?? await this.getNextId();

        // Serialize arrays to JSON strings
        const dataToInsert: any = { ...data };
        if (Array.isArray(data.voice_channels)) {
            dataToInsert.voice_channels = JSON.stringify(data.voice_channels);
        }
        if (Array.isArray(data.text_channels)) {
            dataToInsert.text_channels = JSON.stringify(data.text_channels);
        }
        if (Array.isArray(data.vocal_with)) {
            dataToInsert.vocal_with = JSON.stringify(data.vocal_with);
        }

        try {
            await db.query(`INSERT INTO ${this.tableName} SET ?`, dataToInsert);
            return data as UtilisateursDiscordStatsInterface;
        } catch (error) {
            console.error("UtilisateursDiscordStatsRepository: Insert failed", error);
            throw error;
        }
    }

    /**
     * Updates an existing user record in the database.
     *
     * @param {Partial<UtilisateursDiscordStatsInterface>} data - An object containing the fields to update.
     * @param {number} id - The unique identifier of the user to be updated.
     * @return {Promise<any>} A promise that resolves with the result of the update operation.
     */
    async update(data: Partial<UtilisateursDiscordStatsInterface>, id: number) {
        // Serialize arrays to JSON strings
        const dataToUpdate: any = { ...data };
        if (Array.isArray(data.voice_channels)) {
            dataToUpdate.voice_channels = JSON.stringify(data.voice_channels);
        }
        if (Array.isArray(data.text_channels)) {
            dataToUpdate.text_channels = JSON.stringify(data.text_channels);
        }
        if (Array.isArray(data.vocal_with)) {
            dataToUpdate.vocal_with = JSON.stringify(data.vocal_with);
        }

        return await this.query(`UPDATE ${this.tableName}
                                 SET ?
                                 WHERE id = ?`, [dataToUpdate, id]);
    }
}