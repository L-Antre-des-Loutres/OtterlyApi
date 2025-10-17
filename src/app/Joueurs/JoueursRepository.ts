import {Repository} from "../../otterly/abstractClass/repositories/Repository";
import {JoueursInterface} from "./JoueursInterface";

/**
 * RepositoryJoueurs is a specialized repository class for list of player data.
 * It extends the generic Repository class, providing specific methods for the JoueursInterface.
 */

export class JoueursRepository extends Repository<JoueursInterface> {

    private readonly codeTable = "codes_liaison"

    constructor() {
        super("joueurs");

    }

    // Fetches all players from the database
    async getAll(){
        return await this.findAll();
    }

    // Registers a player's name in the database'
    async registerPlayerName(id: number, playername: string) {
        await this.query(`UPDATE ${this.tableName} SET playername = ? WHERE id = ?`, [playername, id]);
    }

    // Link a player to a Discord account
    async linkDiscordAccount(id: number, utilisateur_id: string) {
        try {
            await this.query(`UPDATE ${this.tableName}
                              SET utilisateur_id = ?
                              WHERE id = ?`, [utilisateur_id, id]);
        } catch (error) {
            throw new Error(`Erreur lors de la liaison du compte : ${error}`);
        }
    }

    // Checks if a code exists in the database and is not expired
    async checkCode(code: string): Promise<number | null> {
        const result = await this.query(
            `SELECT joueur_id
             FROM ${this.codeTable}
             WHERE code_liaison = ?
               AND expire_le > NOW()
               AND utilise_le IS NULL`,
            [code]
        );

        // Si un joueur est trouvé, on renvoie son id
        if (result.length > 0) {
            return result[0].joueur_id ?? null;
        }
        return null;
    }

    // Marks a code as used
    async usedCode(code: string) {
        await this.query(`UPDATE ${this.codeTable}
                          SET utilise_le = NOW()
                          WHERE code_liaison = ?`, [code]);
    }

}