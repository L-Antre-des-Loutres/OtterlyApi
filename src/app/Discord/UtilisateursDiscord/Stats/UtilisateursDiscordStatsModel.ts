import {Channel, DiscordUser, UtilisateursDiscordStatsInterface} from "./UtilisateurDiscordStatsInterface";
import {Model} from "../../../../otterly/abstractClass/models/Model";
import {UtilisateursDiscordStatsRepository} from "./UtilisateursDiscordStatsRepository";

/**
 * Represents the statistics related to Discord users, including messages sent,
 * vocal time, and activity within voice and text channels.
 */

export class UtilisateursDiscordStatsModel extends Model implements UtilisateursDiscordStatsInterface {

    id: number
    id_utilisateur: number
    nb_message: number
    vocal_time: number
    date_stats: string
    voice_channels: Channel[]
    text_channels: Channel[]
    vocal_with: DiscordUser[]

    private readonly repository = new UtilisateursDiscordStatsRepository();

    constructor(data: Partial<UtilisateursDiscordStatsInterface>) {
        super(data);
        this.id = data.id ?? 0;
        this.id_utilisateur = data.id_utilisateur ?? 0;
        this.nb_message = data.nb_message ?? 0;
        this.vocal_time = data.vocal_time ?? 0;
        this.date_stats = data.date_stats ?? "";
        this.voice_channels = data.voice_channels ?? [];
        this.text_channels = data.text_channels ?? [];
        this.vocal_with = data.vocal_with ?? [];

    }

    async getAll() {
        return await this.repository.findAll();
    }

    /**
     * Retrieves a record by the given user ID.
     *
     * @param {number} id - The ID of the user whose record needs to be retrieved.
     * @return {Promise<any>} A promise that resolves to the record associated with the given user ID.
     */
    async getByUserId(id: number) {
        return await this.repository.getByUserId(id);
    }

    /**
     * Inserts a partial object of UtilisateursDiscordStatsInterface into the repository.
     *
     * @param {Partial<UtilisateursDiscordStatsInterface>} data - The partial data object to be inserted into the repository.
     * @return {Promise<void>} A promise that resolves when the data is successfully inserted.
     */
    async insert(data: Partial<UtilisateursDiscordStatsInterface>) {
        return await this.repository.insert(data)
    }


    /**
     * Updates an existing record with the provided data.
     *
     * @param {Partial<UtilisateursDiscordStatsInterface>} data - The data to update the record with.
     * @param {number} id - The unique identifier of the record to update.
     * @return {Promise<void>} A promise that resolves when the update is complete.
     */
    async update(data: Partial<UtilisateursDiscordStatsInterface>, id: number) {
        await this.repository.update(data, id);
    }
}