// src/repositories/repository-joueurs.ts

import {Repository} from "./Repository";
import {JoueursInterface} from "../interfaces/JoueursInterface";

export class RepositoryJoueurs extends Repository<JoueursInterface> {

    constructor() {
        super("joueurs");

    }

    // Récupére l'ensemble des données
    async getAll(){
        return await this.findAll();
    }

    // Update le playername par rapport à l'uid
    async registerPlayerName(id: number, playername: string) {
        await this.query(`UPDATE ${this.tableName} SET playername = ? WHERE id = ?`, [playername, id]);
    }
}