// src/repositories/repository-astroloutre_image.ts

import {Repository} from "./Repository";
import {AstroloutreImageInterface} from "../interfaces/AstroloutreImageInterface";

export class RepositoryAstroLoutreImage extends Repository<AstroloutreImageInterface>{
    constructor() {
        super("astroloutre_image");
    }

    async getByGame(jeu: string){
        return await this.query(`SELECT * FROM ${this.tableName} WHERE jeu = ?`, [jeu]);
    }
}