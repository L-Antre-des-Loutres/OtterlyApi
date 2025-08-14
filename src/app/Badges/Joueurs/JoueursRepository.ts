import {Repository} from "../../../otterly/abstractClass/repositories/Repository";
import {BadgesJoueursInterface} from "./JoueursInterface";

/**
 * A repository class responsible for managing access to the "badges_joueurs" database collection.
 * Extends the generic Repository class with the type defined by BadgesJoueursInterface.
 *
 * This class is intended to encapsulate database operations specifically related to the "badges_joueurs" collection.
 * It provides methods inherited from the Repository base class for performing operations such as create, read, update, and delete.
 *
 * The constructor initializes the repository with the "badges_joueurs" table or collection name.
 */

export class BadgesJoueursRepository extends Repository<BadgesJoueursInterface>{
    constructor() {
        super("badges_joueurs");
    }

    async findByPlayerId(id: number){
        return await this.query(
            `SELECT j.*,
                    b.id AS badge_id, b.nom AS badge_nom, b.categorie_id, b.image_url, b.description, b.obtention,
                    c.nom AS categorie
             FROM ${this.tableName} AS j
                      JOIN badges AS b ON j.badge_id = b.id
                      JOIN badges_categories AS c ON b.categorie_id = c.id
             WHERE j.joueur_id = ?`,
            [id]
        );
    }
}