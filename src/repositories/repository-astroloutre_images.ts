// src/repositories/repository-astroloutre_image.ts.

/**
 * TODO
 */

import {Repository} from "./Repository";
import {AstroloutreImagesInterface} from "../interfaces/AstroloutreImagesInterface";

export class RepositoryAstroLoutreImage extends Repository<AstroloutreImagesInterface>{
    constructor() {
        super("astroloutre_images");
    }

    async getByGame(jeu: string){
        return await this.query(`SELECT * FROM ${this.tableName} WHERE jeu = ?`, [jeu]);
    }
}