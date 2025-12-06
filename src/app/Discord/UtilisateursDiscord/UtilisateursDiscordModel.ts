import {Model} from "../../../otterly/abstractClass/models/Model";
import {UtilisateursDiscordInterface} from "./UtilisateursDiscordInterface";
import {UtilisateursDiscordRepository} from "./UtilisateursDiscordRepository";

/**
 * Represents a model for Discord users, implementing UtilisateursDiscordInterface.
 * This class includes various properties and methods related to Discord user data.
 * It extends the base Model class and interacts with a repository for data management.
 */

export class UtilisateursDiscordModel extends Model implements UtilisateursDiscordInterface{

    id: number
    discord_id: string
    tag_discord: string
    pseudo_discord: string
    join_date_discord: string
    first_activity: string
    last_activity: string
    nb_message: number
    avatar_url: string


    constructor(data: Partial<UtilisateursDiscordInterface>) {
        super(data);
        this.id = data.id ?? 0;
        this.discord_id = data.discord_id ?? "";
        this.tag_discord = data.tag_discord ?? "";
        this.pseudo_discord = data.pseudo_discord ?? "";
        this.join_date_discord = data.join_date_discord ?? "";
        this.first_activity = data.first_activity ?? "";
        this.last_activity = data.last_activity ?? "";
        this.nb_message = data.nb_message ?? 0;
        this.avatar_url = data.avatar_url ?? "";

    }

    private readonly repository = new UtilisateursDiscordRepository();

    // Méthode pour obtenir l'ensemble des utilisateurs Discord
    async getAll(){
        return await this.repository.findAll();
    }

    // Méthode pour obtenir un utilisateur Discord par son ID
    async getById(id: number) {
        return await this.repository.findById(id);
    }

    // Méthode pour obtenir un utilisateur Discord par son ID Discord
    async getByDiscordId(discord_id: string) {
        return await this.repository.getByDiscordId(discord_id);
    }

    // Méthode pour enregistrer un utilisateur Discord
    async create(data: Partial<UtilisateursDiscordInterface>) {
        return await this.repository.insert(data);
    }

    async update(data: Partial<UtilisateursDiscordInterface>, id: number) {
        return await this.repository.update(data, id);
    }

    async updateNbMessage(id: number, nb_message: string) {
        return this.repository.updateNbMessage(id, nb_message);
    }

    async updateVocalTime(id: number, voix_time: string) {
        return this.repository.updateVocalTime(id, voix_time);
    }

    async updateLastActivity(id: number, last_activity: string) {
        return this.repository.updateLastActivity(id, last_activity);
    }
}