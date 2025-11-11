import axios from "axios";
import {Service} from "../../otterly/abstractClass/services/Service";
import {ServeursInterface} from "./ServeursInterface";
import {ServeurParametersRepository} from "./ServeursParameters/ServeurParametersRepository";

/**
 * ServeurService is a class responsible for managing server operations, including player data retrieval
 * for various games like Minecraft and Palworld. It extends the base Service class and focuses on
 * functionalities required to interact with servers and fetch relevant information.
 */

export class ServeurService extends Service {

    // Import du RepositoryServeurParameters
    private static readonly repositoryServeurParameters = new ServeurParametersRepository();

    constructor() {
        super("Serveur - Service");
    }

    // ---------------- MÉTHODES GESTION DU LANCEMENT / ARRET DU SERVEUR / INSTALLATION ------------------

    // ---------------------------------------------------------------------------------------------------

    // Méthode pour récupérer le nombre de joueurs sur Palworld
    private async getPalworldPlayers(_: ServeursInterface): Promise<number> {
        try {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8212/v1/api/players',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.PALWORLD_STRING ?? "",
                },
            };

            const response = await axios(config);

            if (response.status === 200) {
                const players = Array.isArray(response.data.players) ? response.data.players : [];
                return players.length;
            } else {
                this.logInfo(`Palworld: code de réponse inattendu ${response.status}`);
                return 0;
            }
        } catch (error) {
            this.logError("Erreur API Palworld :", error instanceof Error ? error.message : String(error));
            return 0;
        }
    }


}