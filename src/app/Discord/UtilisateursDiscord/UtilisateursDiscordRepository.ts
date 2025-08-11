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
}