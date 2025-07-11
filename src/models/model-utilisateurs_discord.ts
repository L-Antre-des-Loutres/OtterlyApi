// src/models/model-utilisateurs_discord.ts

import {Model} from "./Model";
import {UtilisateursDiscordInterface} from "../interfaces/UtilisateursDiscordInterface";
import {RepositoryUtilisateursDiscord} from "../repositories/repository-utilisateurs_discord";

/**
 * TODO
 */

export class ModelUtilisateursDiscord extends Model implements UtilisateursDiscordInterface{

    id: number
    discord_id: string
    tag_discord: string
    pseudo_discord: string
    join_date_discord: string
    first_activity: string
    last_activity: string
    nb_message: number


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

    }

    private readonly repository = new RepositoryUtilisateursDiscord();

    // Méthode pour obtenir l'ensemble des images
    async getAll(){
        return await this.repository.findAll();
    }
}