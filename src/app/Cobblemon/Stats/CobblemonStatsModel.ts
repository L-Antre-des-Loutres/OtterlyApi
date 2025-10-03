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
    joueur_uuid: string;
    pkmn1: string;
    pkmn1_form: string;
    pkmn2: string;
    pkmn2_form: string;
    pkmn3: string;
    pkmn3_form: string;
    pkmn4: string;
    pkmn4_form: string;
    pkmn5: string;
    pkmn5_form: string;
    pkmn6: string;
    pkmn6_form: string;
    serveur_id: number;
    
    constructor(data: Partial<CobblemonStatsInterface>) {
        super(data);
        this.id = data.id ?? 0;
        this.joueur_uuid = data.joueur_uuid ?? "";
        this.pkmn1 = data.pkmn1 ?? "";
        this.pkmn1_form = data.pkmn1_form ?? "";
        this.pkmn2 = data.pkmn2 ?? "";
        this.pkmn2_form = data.pkmn2_form ?? "";
        this.pkmn3 = data.pkmn3 ?? "";
        this.pkmn3_form = data.pkmn3_form ?? "";
        this.pkmn4 = data.pkmn4 ?? "";
        this.pkmn4_form = data.pkmn4_form ?? "";
        this.pkmn5 = data.pkmn5 ?? "";
        this.pkmn5_form = data.pkmn5_form ?? "";
        this.pkmn6 = data.pkmn6 ?? "";
        this.pkmn6_form = data.pkmn6_form ?? "";
        this.serveur_id = data.serveur_id ?? 0;
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