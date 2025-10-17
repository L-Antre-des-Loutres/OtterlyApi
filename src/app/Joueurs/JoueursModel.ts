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
        return await this.repository.getAll();
    }

    // Link a player to a Discord account
    async linkDiscordAccount(id: number, utilisateur_id: string) {
        try {
            await this.repository.linkDiscordAccount(id, utilisateur_id);
        } catch (error) {
            throw new Error(`Erreur lors de la liaison du compte : ${error}`);
        }
    }

    // Checks if a code exists in the database and is not expired
    async checkCode(code: string) {
        return await this.repository.checkCode(code);
    }

    async usedCode(code: string) {
        await this.repository.usedCode(code);
    }
}