import axios from "axios";
import {status} from 'minecraft-server-util';
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

    // Méthode pour récupérer le nombre de joueurs connectés au serveur
    async getPlayersCount(serveur: ServeursInterface): Promise<number> {
        try {
            // Vérification du jeu sur le serveur
            switch (serveur.jeu) {
                // Minecraft
                case "Minecraft":
                    try {
                        return await this.getMinecraftPlayersCount(serveur);
                    } catch (error) {
                        this.logError("Erreur lors de la récupération des joueurs Minecraft :", error instanceof Error ? error.message : String(error));
                        return 0;
                    }

                // Palworld
                case "Palworld":
                    try {
                        return await this.getPalworldPlayers(serveur);
                    } catch (error) {
                        this.logError("Erreur lors de la récupération des joueurs Palworld :", error instanceof Error ? error.message : String(error));
                        return 0;
                    }

                default:
                    return 0;
            }
        } catch (error: unknown) {
            this.logError("Erreur lors de la récupération du nombre de joueurs :", error instanceof Error ? error.message : String(error));
            return 0;
        }
    }

    // Méthode pour récupérer le nombre de joueurs sur Minecraft
    private async getMinecraftPlayersCount(serveur: ServeursInterface): Promise<number> {
        try {
            const serveurParameters = await ServeurService.repositoryServeurParameters.getFirstParameters();

            if (!serveurParameters?.host_primaire || !serveurParameters?.rcon_password) {
                this.logError("Serveur Minecraft : les paramètres n'ont pas été trouvés");
                return 0;
            }

            const host = serveur.id === serveurParameters.id_serv_primaire
                ? serveurParameters.host_primaire
                : serveurParameters.host_secondaire

            const port = serveur.id === serveurParameters.id_serv_primaire
                ? 25565
                : 25564

            // Utilisation du package : minecraft-server-util
            const response = await status(host, port)

            // Vérification de la réponse
            if (response.players.online === undefined) {
                this.logError("Serveur Minecraft : la réponse n'est pas valide");
                return 0;
            }

            return response.players.online;

        } catch (error) {
            this.logError("Serveur Minecraft : erreur lors de la récupération du nombre de joueurs :", error instanceof Error ? error.message : String(error));
            return 0;
        }
    }

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