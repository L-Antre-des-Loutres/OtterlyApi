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
                    b.*,
                    c.nom AS categorie,
                    (
                        SELECT COUNT(DISTINCT j2.joueur_id) * 100.0 /
                               (SELECT COUNT(*) FROM joueurs)
                        FROM ${this.tableName} AS j2
                        WHERE j2.badge_id = j.badge_id
                    ) AS pourcentage_obtention
             FROM ${this.tableName} AS j
                      JOIN badges AS b ON j.badge_id = b.id
                      JOIN badges_categories AS c ON b.categorie_id = c.id
             WHERE j.joueur_id = ?`,
            [id]
        );
    }

    // Ajout du badge
    async addBadge(joueur_id: number, badge_id: number) {
        const now = new Date();
        const parisDate = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Paris"}));
        const mysqlDatetime = parisDate.toISOString().slice(0, 19).replace("T", " ");
        await this.query(`INSERT INTO ${this.tableName} (joueur_id, badge_id, date_recu)
                          VALUES (?, ?, ?)`, [joueur_id, badge_id, mysqlDatetime]);
    }
}