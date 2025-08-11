import {Repository} from "../../../otterly/abstractClass/repositories/Repository";
import {AstroloutreImagesInterface} from "./ImagesInterface";

/**
 * AstroloutreImagesRepository is a repository class that extends the base Repository
 * to manage the persistence and retrieval of AstroloutreImagesInterface entries in the database.
 * It provides an interface to query image data related to a specified game.
 *
 * Methods:
 * - getByGame(jeu): Asynchronously retrieves entries from the database based on the specified game name.
 *
 * Constructor automatically initializes the repository with the "astroloutre_images" table name.
 */

export class AstroloutreImagesRepository extends Repository<AstroloutreImagesInterface>{
    constructor() {
        super("astroloutre_images");
    }

    async getByGame(jeu: string){
        return await this.query(`SELECT * FROM ${this.tableName} WHERE jeu = ?`, [jeu]);
    }
}