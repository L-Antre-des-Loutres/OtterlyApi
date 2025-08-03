import {Model} from "../../otterly/abstractClass/models/Model";
import {JoueursInterface} from "./JoueursInterface";
import {JoueursRepository} from "./JoueursRepository";

/**
 * Represents the JoueursModel class used to manage player information.
 * This class extends the Model class and implements the JoueursInterface.
 */

export class JoueursModel extends Model implements JoueursInterface {
    id: number;
    utilisateur_id: number;
    jeu: string;
    compte_id: string;
    premiere_co: string;
    derniere_co: string;
    playername: string;

    constructor(data: Partial<JoueursInterface> = {}) {
        super(data);

        this.id = Number(data.id) || 0;
        this.utilisateur_id = Number(data.utilisateur_id) || 0;
        this.jeu = data.jeu ?? "";
        this.compte_id = data.compte_id ?? "";
        this.premiere_co = data.premiere_co ?? "";
        this.derniere_co = data.derniere_co ?? "";
        this.playername = data.playername ?? "";
    }

    // Initialisation du repository
    private readonly repository = new JoueursRepository();

    async getAll(){
        return await this.repository.findAll();
    }
}