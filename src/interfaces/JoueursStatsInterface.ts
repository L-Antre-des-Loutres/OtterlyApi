// src/interfaces/JoueursStatsInterface.ts

/**
 * @interface JoueursStatsInterface
 * @property {number} id - Primary id
 * @property {number} serveur_id - Id of the server
 * @property {string} compte_id - Id of the account
 * @property {number} tmps_jeux - Time of playing
 * @property {number} nb_mort - number of death
 * @property {number} nb_kills - number of mob kill
 * @property {number} nb_playerkill - number of player kill
 * @property {string} mob_killed - JSON list of killed mob
 * @property {number} nb_blocs_detr - number of destroyed block
 * @property {number} nb_blocs_pose - number of placed block
 * @property {number} dist_total - number of walk distance
 * @property {number} dist_pieds - number of walk distance
 * @property {number} dist_elytres - number of elytra fly distance
 * @property {number} dist_vol - number of fly distance
 * @property {string} item_crafted - JSON list of crafted item
 * @property {string} item_broken - JSON list of broken item
 * @property {string} achievement - JSON list of achivement
 * @property {date} dern_enregistrment - Date of last register
 */

export interface JoueursStatsInterface {
    id: number;
    serveur_id: number;
    compte_id: string;
    tmps_jeux: number;
    nb_mort: number;
    nb_kills: number;
    nb_playerkill: number;
    mob_killed: { [key: string]: number };
    nb_blocs_detr: number;
    nb_blocs_pose: number;
    dist_total: number;
    dist_pieds: number;
    dist_elytres: number;
    dist_vol: number;
    item_crafted: { [key: string]: number };
    item_broken: { [key: string]: number };
    achievement: { [key: string]: number };
    dern_enregistrement: string;
}