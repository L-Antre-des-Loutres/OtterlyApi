import {Repository} from "../../../otterly/abstractClass/repositories/Repository";
import {BadgesInfosInterface} from "./InfosInterface";

/**
 * Repository class for managing badge information entities.
 * Extends the base Repository class, providing specialized methods
 * and behaviors for handling data related to badges.
 *
 * The BadgesInfosRepository is responsible for:
 * - Interacting with the data source for badge-related information.
 * - Providing abstraction and encapsulation for badge entity-related operations.
 * - Utilizing the base functionality of the Repository class with "badges" as the dataset identifier.
 *
 * This class is designed to facilitate organized and efficient data access and manipulation
 * for badge information within the application.
 */

export class BadgesInfosRepository extends Repository<BadgesInfosInterface>{
    constructor() {
        super("badges");
    }

    async findByCategorieId(id : number){
        return await this.query(`SELECT * FROM ${this.tableName} WHERE categorie_id = ?`, [id]);
    }
}