import {Model} from "../../../otterly/abstractClass/models/Model";
import {CobblemonStatsInterface} from "./CobblemonStatsInterface";
import {CobblemonStatsRepository} from "./CobblemonStatsRepository";

/**
 * Represents the CobblemonStatsModel class, which extends the Model class and implements CobblemonStatsInterface.
 * This class is responsible for managing data related to Cobblemon statistics, including information about six associated Pokémon.
 * It provides methods for interacting with a repository to retrieve data.
 *
 * This model contains the following properties:
 * - id: A unique identifier for the Cobblemon stats record.
 * - joueurs_stats_id: A reference ID linking to the associated player stats.
 * - pkmn_1: The name of the first Pokémon.
 * - pkmn_2: The name of the second Pokémon.
 * - pkmn_3: The name of the third Pokémon.
 * - pkmn_4: The name of the fourth Pokémon.
 * - pkmn_5: The name of the fifth Pokémon.
 * - pkmn_6: The name of the sixth Pokémon.
 *
 * The class also has an associated private repository for operations such as retrieving all data.
 *
 * Methods:
 * - constructor(data: Partial<CobblemonStatsInterface>): Initializes a new instance of the CobblemonStatsModel class with optional data.
 * - getAll(): Fetches all Cobblemon stats records from the repository asynchronously.
 */

export class CobblemonStatsModel extends Model implements CobblemonStatsInterface{

    // Properties
    id: number
    joueurs_stats_id: number
    pkmn_1: string
    pkmn_2: string
    pkmn_3: string
    pkmn_4: string
    pkmn_5: string
    pkmn_6: string
    
    constructor(data: Partial<CobblemonStatsInterface>) {
        super(data);
        this.id = data.id ?? 0;
        this.joueurs_stats_id = data.joueurs_stats_id ?? 0;
        this.pkmn_1 = data.pkmn_1 ?? "";
        this.pkmn_2 = data.pkmn_2 ?? "";
        this.pkmn_3 = data.pkmn_3 ?? "";
        this.pkmn_4 = data.pkmn_4 ?? "";
        this.pkmn_5 = data.pkmn_5 ?? "";
        this.pkmn_6 = data.pkmn_6 ?? "";
    }

    // Repository CobblemonStats
    private readonly repository = new CobblemonStatsRepository();

    // Obtenir toutes les stats du joueur
    async getAll(): Promise<CobblemonStatsInterface[]>{
        return await this.repository.getAll();
    }

    // Obtenir les stats du joueur par son ID
    async getByCompteId(uid: string){
        return await this.repository.getByCompteId(uid);
    }
}