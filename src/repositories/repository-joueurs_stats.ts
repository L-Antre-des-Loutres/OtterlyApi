import {Repository} from "./Repository";
import {JoueursStatsInterface} from "../interfaces/JoueursStatsInterface";

/**
 * TODO
 */

export class RepositoryJoueursStats extends Repository<JoueursStatsInterface> {
    constructor() {
        super("joueurs_stats");
    }

    async getAllStatsWithPlayerName(): Promise<JoueursStatsInterface[]> {
        return await super.query(`
            SELECT
                js.id,
                js.serveur_id,
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
                js.dern_enregistrement,
                j.playername
            FROM ${this.tableName} js
                     JOIN joueurs j ON js.compte_id = j.compte_id
        `);
    }

    // Méthode pour obtenir les statistiques de l'emsemble des joueurs de façon concise
    async getMinStatsWithPlayerName(): Promise<JoueursStatsInterface[]> {
        return await super.query(`
            SELECT
                js.serveur_id,
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
        `);
    }

}