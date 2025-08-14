import {Repository} from "../../../otterly/abstractClass/repositories/Repository";
import {BadgesUtilisateursInterface} from "./UtilisateursInterface";

/**
 * Repository class for managing operations related to the "badges_utilisateurs" collection.
 * This class extends the generic Repository and operates on objects adhering to the BadgesUtilisateursInterface.
 * It provides a mechanism to interact with the underlying "badges_utilisateurs" data source.
 */

export class BadgesUtilisateursRepository extends Repository<BadgesUtilisateursInterface>{
    constructor() {
        super("badges_utilisateurs");
    }

    async findByUserId(id: number){
        return await this.query(
            `SELECT j.*,
                    b.*,
                    c.nom AS categorie,
                    (
                        SELECT COUNT(DISTINCT j2.utilisateur_id) * 100.0 /
                               (SELECT COUNT(*) FROM utilisateurs)
                        FROM ${this.tableName} AS j2
                        WHERE j2.badge_id = j.badge_id
                    ) AS pourcentage_obtention
             FROM ${this.tableName} AS j
                      JOIN badges AS b ON j.badge_id = b.id
                      JOIN badges_categories AS c ON b.categorie_id = c.id
             WHERE j.utilisateur_id = ?`,
            [id]
        );
    }
}