import {Model} from "./Model";
import {JoueursStatsInterface} from "../interfaces/JoueursStatsInterface";
import {RepositoryJoueursStats} from "../repositories/repository-joueurs_stats";

// Types utilitaires
type ItemMap = { [key: string]: number };

export class ModelJoueursStats extends Model implements JoueursStatsInterface {
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
    dern_enregistrement: string;

    constructor(data: Partial<ModelJoueursStats>) {
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
        this.dern_enregistrement = data.dern_enregistrement ?? "";
    }

    private readonly repository = new RepositoryJoueursStats();

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
            dern_enregistrement: this.dern_enregistrement,
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
}
