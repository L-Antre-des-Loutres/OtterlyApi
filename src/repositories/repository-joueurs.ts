import {Repository} from "./Repository";
import {JoueursInterface} from "../interfaces/JoueursInterface";

export class RepositoryJoueurs extends Repository<JoueursInterface> {

    constructor() {
        super("joueurs");

    }

    // Update le playername par rapport à l'uid
    async registerPlayerName(id: number, playername: string) {
        await this.query(`UPDATE ${this.tableName} SET playername = ? WHERE id = ?`, [playername, id]);
    }
}