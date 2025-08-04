import {JoueursStatsInterface} from "./JoueursStatsInterface";
import {Model} from "../../../otterly/abstractClass/models/Model";
import {JoueursStatsRepository} from "./JoueursStatsRepository";

/**
 * Represents a mapping of string keys to numerical values.
 *
 * This type is used to associate unique keys with corresponding numeric values.
 *
 * Useful for scenarios where data needs to be indexed or categorized by string identifiers.
 */

// Types utilitaires
type ItemMap = { [key: string]: number };

export class JoueursStatsModel extends Model implements JoueursStatsInterface {
    id: number;
    serveur_id: number;
    compte_id: string;
    tmps_jeux: number;
    nb_mort: number;
    nb_kills: number;
    nb_playerkill: number;
    mob_killed: ItemMap;
    nb_blocs_detr: number;
    nb_blocs_pose: number;
    dist_total: number;
    dist_pieds: number;
    dist_elytres: number;
    dist_vol: number;
    item_crafted: ItemMap;
    item_broken: ItemMap;
    achievement: ItemMap;
    dern_enregistrment: string;

    constructor(data: Partial<JoueursStatsModel>) {
        super(data);
        this.id = data.id ?? 0;
        this.serveur_id = data.serveur_id ?? 0;
        this.compte_id = data.compte_id ?? "";
        this.tmps_jeux = data.tmps_jeux ?? 0;
        this.nb_mort = data.nb_mort ?? 0;
        this.nb_kills = data.nb_kills ?? 0;
        this.nb_playerkill = data.nb_playerkill ?? 0;
        this.mob_killed = data.mob_killed ?? {};
        this.nb_blocs_detr = data.nb_blocs_detr ?? 0;
        this.nb_blocs_pose = data.nb_blocs_pose ?? 0;
        this.dist_total = data.dist_total ?? 0;
        this.dist_pieds = data.dist_pieds ?? 0;
        this.dist_elytres = data.dist_elytres ?? 0;
        this.dist_vol = data.dist_vol ?? 0;
        this.item_crafted = data.item_crafted ?? {};
        this.item_broken = data.item_broken ?? {};
        this.achievement = data.achievement ?? {};
        this.dern_enregistrment = data.dern_enregistrment ?? "";
    }

    private readonly repository = new JoueursStatsRepository();

    async toJSON(): Promise<Record<string, any>> {
        return {
            id: this.id,
            serveur_id: this.serveur_id,
            compte_id: this.compte_id,
            tmps_jeux: this.tmps_jeux,
            nb_mort: this.nb_mort,
            nb_kills: this.nb_kills,
            nb_playerkill: this.nb_playerkill,
            mob_killed: this.mob_killed,
            nb_blocs_detr: this.nb_blocs_detr,
            nb_blocs_pose: this.nb_blocs_pose,
            dist_total: this.dist_total,
            dist_pieds: this.dist_pieds,
            dist_elytres: this.dist_elytres,
            dist_vol: this.dist_vol,
            item_crafted: this.item_crafted,
            item_broken: this.item_broken,
            achievement: this.achievement,
            dern_enregistrment: this.dern_enregistrment,
        }
    }

    // Méthode pour obtenir toutes les stats
    async getAll() {
        return await this.repository.getAllStatsWithPlayerName();
    }

    // Méthode pour obtenir toutes les stats mais de façon minimal
    async getAllMinStats() {
        return await this.repository.getMinStatsWithPlayerName();
    }

    // Méthode pour obtenir le total des heures de jeux sur nos serveurs
    async getTotalHours(){
        return await this.repository.getTotalHours();
    }

    // Méthode pour obtenir le nombre total d'heures de jeu pour chaque serveur
    async getTotalHoursPerServer(){
        return await this.repository.getTotalHoursPerServer();
    }

    // Méthode pour obtenir l'ensemble des statistiques d'un joueur par son UID par serveur
    async getStatsByUid(uid: string){
        return await this.repository.getStatsByUid(uid);
    }

    // Méthode pour obtenir l'ensemble des stats par un serveur
    async getStatsByServer(serveur_id: string){
        return await this.repository.getStatsByServer(serveur_id);
    }

    // Méthode pour obtenir le total des statistiques d'un joueur par son UID par serveur
    async getTotalStatsByUid(uid: string){
        return await this.repository.getTotalStatsByUid(uid);
    }
}