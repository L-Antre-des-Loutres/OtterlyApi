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
}