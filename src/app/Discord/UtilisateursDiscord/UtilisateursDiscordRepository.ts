import {Repository} from "../../../otterly/abstractClass/repositories/Repository";
import {UtilisateursDiscordInterface} from "./UtilisateursDiscordInterface";

/**
 * RepositoryUtilisateursDiscord class extends the generic Repository class
 * and is specifically designed to manage data operations for Discord users.
 */

export class UtilisateursDiscordRepository extends Repository<UtilisateursDiscordInterface>{
    constructor() {
        super("utilisateurs_discord");
    }

    async getAll(){
        return await this.findAll();
    }

    async getByDiscordId(discord_id: string) {
        const result = await this.query(
            `SELECT *
             FROM ${this.tableName}
             WHERE discord_id = ?`,
            [discord_id]
        );
        return result[0] ?? null;
    }

    async insert(data: Partial<UtilisateursDiscordInterface>) {
        await this.save(data as UtilisateursDiscordInterface)
    }

    async update(data: Partial<UtilisateursDiscordInterface>, id: number) {
        await this.query(
            `UPDATE ${this.tableName}
             SET discord_id     = ?,
                 tag_discord    = ?,
                 pseudo_discord = ?,
                 avatar_url     = ?
             WHERE id = ?`,
            [data.discord_id, data.tag_discord, data.pseudo_discord, data.avatar_url, id]
        );
    }

    async updateNbMessage(id: number, nb_message: string) {
        await this.query(
            `UPDATE ${this.tableName}
             SET nb_message = nb_message + ${nb_message}
             WHERE id = ?`,
            [id]
        );
    }

    async updateVocalTime(id: number, vocal_time: string) {
        await this.query(
            `UPDATE ${this.tableName}
             SET vocal_time = vocal_time + ?
             WHERE id = ?`,
            [vocal_time, id]
        );
    }

    async updateLastActivity(id: number) {
        await this.query(
            `UPDATE ${this.tableName}
             SET last_activity = CONVERT_TZ(NOW(), 'UTC', 'Europe/Paris')
             WHERE id = ?`,
            [id]
        )
    }
}