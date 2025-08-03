import {Repository} from "../../otterly/abstractClass/repositories/Repository";
import {JoueursInterface} from "./JoueursInterface";

/**
 * RepositoryJoueurs is a specialized repository class for list of player data.
 * It extends the generic Repository class, providing specific methods for the JoueursInterface.
 */

export class JoueursRepository extends Repository<JoueursInterface> {

    constructor() {
        super("joueurs");

    }
    async getAll(){
        return await this.findAll();
    }
    async registerPlayerName(id: number, playername: string) {
        await this.query(`UPDATE ${this.tableName} SET playername = ? WHERE id = ?`, [playername, id]);
    }
}