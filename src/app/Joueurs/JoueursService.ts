import {Service} from "../../otterly/abstractClass/services/Service";
import {JoueursRepository} from "./JoueursRepository";

/**
 * Service class for managing "Joueurs" data.
 * This class extends the base `Service` class and provides methods to handle player-related operations.
 */

export class JoueursService extends Service {
    constructor() {
        super("Joueurs - Service");
    }
    private repository: JoueursRepository = new JoueursRepository();
    private readonly apiRegisterPlayerName = "https://sessionserver.mojang.com/session/minecraft/profile/";


    /**
     * Registers player names by fetching data from an external API and updating the repository.
     * Iterates over all players retrieved from the repository, performs necessary validation,
     * fetches the player name from the API, and updates the repository.
     * Logs errors and information during the process.
     *
     * @return {Promise<void>} A promise that resolves once the registration process is complete.
     */

    async registerPlayerName() {
        try {
            const joueurs = await this.repository.findAll();

            // this.logInfo("Démarrage des enregistrements des playernames en cours...");

            for (const joueur of joueurs) {
                const uuid = joueur.compte_id;
                if (!uuid) {
                    // this.logError(`UUID manquant pour le joueur ID ${joueur.id}`);
                    continue;
                }
                try {
                    const response = await fetch(this.apiRegisterPlayerName + uuid)
                    if (!response.ok) {
                        this.logError(`Échec HTTP pour UUID ${uuid} - Status ${response.status}`);
                        continue;
                    }
                    const text = await response.text();
                    if (!text) {
                        // this.logError(`Réponse vide pour UUID ${uuid}`);
                        continue;
                    }
                    const json = JSON.parse(text);
                    const playername = json.name;
                    if (!playername) {
                        // this.logError(`Playername introuvable pour UUID ${uuid}`);
                        continue;
                    }
                    await this.repository.registerPlayerName(joueur.id, playername);
                    // this.logInfo(`Playername enregistré pour UUID ${uuid} : ${playername}`);
                } catch (innerError) {
                    const err = innerError as Error;
                    this.logError(`Erreur pendant le traitement du joueur UUID ${uuid}`, err.message);
                    // continue pour passer au joueur suivant sans interrompre toute la boucle
                }
            }
            this.logInfo("Enregistrement des playernames réussi ! ✔️");
        } catch (error) {
            const err = error as Error;
            this.logError("Erreur générale lors de l'enregistrement des playernames", err.message);
        }
    }

}