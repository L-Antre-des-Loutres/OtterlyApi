// src/repositories/repository-astroloutre_image.ts.

/**
 * TODO
 */

import {Repository} from "./Repository";
import {UtilisateursDiscordInterface} from "../interfaces/UtilisateursDiscordInterface";


export class RepositoryUtilisateursDiscord extends Repository<UtilisateursDiscordInterface>{
    constructor() {
        super("utilisateurs_discord");
    }

    async getAll(){
        return await this.findAll();
    }
}