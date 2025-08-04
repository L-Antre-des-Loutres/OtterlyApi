import {Repository} from "../../../otterly/abstractClass/repositories/Repository";
import {JoueursStatsInterface} from "./JoueursStatsInterface";

/**
 * Repository class for managing and querying player statistics in the "joueurs_stats" database table.
 * This class extends a generic repository and provides methods to perform various operations
 * related to player statistics and related data.
 */

export class JoueursStatsRepository extends Repository<JoueursStatsInterface> {
    constructor() {
        super("joueurs_stats");
    }

    async getAllStatsWithPlayerName(): Promise<JoueursStatsInterface[]> {
        return await super.query(`
            SELECT
                js.id,
                js.serveur_id,
                s.nom,
                js.compte_id,
                js.tmps_jeux,
                js.nb_mort,
                js.nb_kills,
                js.nb_playerkill,
                js.mob_killed,
                js.nb_blocs_detr,
                js.nb_blocs_pose,
                js.dist_total,
                js.dist_pieds,
                js.dist_elytres,
                js.dist_vol,
                js.item_crafted,
                js.item_broken,
                js.achievement,
                js.dern_enregistrment,
                j.playername
            FROM ${this.tableName} js
                     JOIN joueurs j ON js.compte_id = j.compte_id
                     JOIN serveurs s ON js.serveur_id = s.id
        `);
    }

    // Méthode pour obtenir les statistiques de l'emsemble des joueurs de façon concise
    async getMinStatsWithPlayerName(): Promise<JoueursStatsInterface[]> {
        return await super.query(`
            SELECT
                js.serveur_id,
                s.nom,
                js.compte_id,
                j.playername,
                js.tmps_jeux,
                js.nb_mort,
                js.nb_kills,
                js.nb_playerkill,
                js.nb_blocs_detr,
                js.nb_blocs_pose,
                js.dist_total,
                js.dist_pieds,
                js.dist_elytres,
                js.dist_vol
            FROM ${this.tableName} js
                     JOIN joueurs j ON js.compte_id = j.compte_id
                     JOIN serveurs s ON js.serveur_id = s.id
        `);
    }

    // Méthode pour obtenir l'ensemble des statistiques d'un joueur par son UID par serveur
    async getStatsByUid(uid: string): Promise<JoueursStatsInterface[]> {
        return await super.query(
            `
                SELECT
                    js.id,
                    js.serveur_id,
                    s.nom,
                    js.compte_id,
                    js.tmps_jeux,
                    js.nb_mort,
                    js.nb_kills,
                    js.nb_playerkill,
                    js.mob_killed,
                    js.nb_blocs_detr,
                    js.nb_blocs_pose,
                    js.dist_total,
                    js.dist_pieds,
                    js.dist_elytres,
                    js.dist_vol,
                    js.item_crafted,
                    js.item_broken,
                    js.achievement,
                    js.dern_enregistrment,
                    j.playername
                FROM ${this.tableName} js
                         JOIN joueurs j ON js.compte_id = j.compte_id
                         JOIN serveurs s ON js.serveur_id = s.id
                WHERE js.compte_id = ?
            `,
            [uid]
        );
    }

    // Méthode pour obtenir le total des statistiques d'un joueur par son UID
    async getTotalStatsByUid(uid: string): Promise<JoueursStatsInterface[]> {
        return await super.query(
            `
                SELECT
                    js.compte_id,
                    MAX(j.playername) AS playername,
                    SUM(js.tmps_jeux) AS tmps_jeux,
                    SUM(js.nb_mort) AS nb_mort,
                    SUM(js.nb_kills) AS nb_kills,
                    SUM(js.nb_playerkill) AS nb_playerkill,
                    SUM(js.nb_blocs_detr) AS nb_blocs_detr,
                    SUM(js.nb_blocs_pose) AS nb_blocs_pose,
                    SUM(js.dist_total) AS dist_total,
                    SUM(js.dist_pieds) AS dist_pieds,
                    SUM(js.dist_elytres) AS dist_elytres,
                    SUM(js.dist_vol) AS dist_vol,
                    MAX(js.dern_enregistrment) AS dern_enregistrment
                FROM ${this.tableName} js
                         JOIN joueurs j ON js.compte_id = j.compte_id
                WHERE js.compte_id = ?
                GROUP BY js.compte_id
            `,
            [uid]
        );
    }

    // Méthode pour obtenir les statistiques des joueurs par serveurs
    async getStatsByServer(serveur_id: string): Promise<JoueursStatsInterface[]> {
        return await super.query(
            `
                SELECT
                    js.id,
                    js.serveur_id,
                    s.nom,
                    js.compte_id,
                    js.tmps_jeux,
                    js.nb_mort,
                    js.nb_kills,
                    js.nb_playerkill,
                    js.mob_killed,
                    js.nb_blocs_detr,
                    js.nb_blocs_pose,
                    js.dist_total,
                    js.dist_pieds,
                    js.dist_elytres,
                    js.dist_vol,
                    js.item_crafted,
                    js.item_broken,
                    js.achievement,
                    js.dern_enregistrment,
                    j.playername
                    FROM ${this.tableName} js
                JOIN joueurs j ON js.compte_id = j.compte_id
                JOIN serveurs s ON js.serveur_id = s.id
                WHERE js.serveur_id = ? 
            `,
            [serveur_id]
        )
    }

    // Méthode pour obtenir le nombre total d'heures de jeu sur nos serveurs
    async getTotalHours(){
        return await super.query(`SELECT SUM(tmps_jeux) as total_hours FROM ${this.tableName}`);
    }

    // Méthode pour obtenir le nombre total d'heures de jeu pour chaque serveur
    async getTotalHoursPerServer(){
        return await super.query(`SELECT serveur_id, SUM(tmps_jeux) as total_hours FROM ${this.tableName} GROUP BY serveur_id`);
    }

}