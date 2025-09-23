import {Model} from "../../../otterly/abstractClass/models/Model";
import {PalworldStatsInterface} from "./PalworldStatsInterface";
import {PalworldStatsRepository} from "./PalworldStatsRepository";

/**
 * Represents the PalworldStatsModel which manages player statistics and operations.
 * This class extends the base `Model` and implements the `PalworldStatsInterface`.
 * It is responsible for handling Palworld player data including server information, gameplay stats, and more.
 *
 * Properties:
 * - id: Unique identifier for the player's statistics entry.
 * - serveur_id: Identifier for the server associated with the player.
 * - compte_id: ID of the player's account.
 * - tmps_jeux: Accumulated gameplay time for the player.
 * - nb_mort: Number of times the player has died in the game.
 * - nb_kills: Total number of kills achieved by the player.
 * - nb_boss_kill: Number of boss enemies defeated by the player.
 * - nb_tower_win: Number of tower wins achieved by the player.
 * - dern_enregistrment: Timestamp of the last record update for the player.
 * - serveur_playername: Associated player name on the server.
 *
 * Constructor Details:
 * - Accepts an optional `data` parameter of type Partial<PalworldStatsInterface>.
 * - Initializes the properties of the class based on data input with default values if undefined.
 *
 * Methods:
 * - getAll: Asynchronously fetches all Palworld player statistics entries using the repository.
 */

export class PalworldStatsModel extends Model implements PalworldStatsInterface {

    id: number
    serveur_id: number
    compte_id: string
    tmps_jeux: number
    nb_mort: number
    nb_kills: number
    nb_boss_kill: number
    nb_tower_win: number
    dern_enregistrment: string
    serveur_playername: string
    // Initialisation du repository
    private readonly repository = new PalworldStatsRepository();

    constructor(data: Partial<PalworldStatsInterface> = {}) {
        super(data);
        this.id = Number(data.id) || 0;
        this.serveur_id = Number(data.serveur_id) || 0;
        this.compte_id = data.compte_id ?? "";
        this.tmps_jeux = Number(data.tmps_jeux) || 0;
        this.nb_mort = Number(data.nb_mort) || 0;
        this.nb_kills = Number(data.nb_kills) || 0;
        this.nb_boss_kill = Number(data.nb_boss_kill) || 0;
        this.nb_tower_win = Number(data.nb_tower_win) || 0;
        this.dern_enregistrment = data.dern_enregistrment ?? "";
        this.serveur_playername = data.serveur_playername ?? "";
    }

    async getAll() {
        return await this.repository.findAll();
    }

    async getGameTimeByServeurId(id: number) {
        return await this.repository.getGameTimeByServeurId(id)
    }

    async getAllGameTime() {
        return await this.repository.getGameTime()
    }
}