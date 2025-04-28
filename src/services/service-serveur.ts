// src/services/service-serveur.ts

import { exec, execSync } from "child_process";
import { promisify } from "util";
import { ServeurInterface } from "../interfaces/ServeurInterfaces";
import { Service } from "./Service";
import axios from "axios";
import { status } from 'minecraft-server-util';
import { RepositoryServeurParameters } from "../repositories/repository-serveur_parameters";

export class ServiceServeur extends Service {

    // Commande pour lancer le serveur
    private readonly startCommand: string;

    // Commande pour arrêter le serveur
    private readonly stopCommand: string;

    // Import du RepositoryServeurParameters
    private static readonly repositoryServeurParameters = new RepositoryServeurParameters();

    constructor() {
        super("Serveur - Service");
        this.startCommand = "serversentinel start-server";
        this.stopCommand = "serversentinel stop-server";
    }

    // ---------------- MÉTHODES GESTION DU LANCEMENT / ARRET DU SERVEUR / INSTALLATION ------------------

    // Méthode de démarrage du serveur
    async startServeur(serveur: ServeurInterface): Promise<boolean> {
        try {
            this.logInfo(`🚀 Démarrage du serveur "${serveur.nom}" avec ${serveur.start_script}`);

            // Préparation de la commande de démarrage
            const command = `${this.startCommand} ${serveur.id}`;
            this.logInfo(`Commande de démarrage : ${command}`);

            // Exécution du script de démarrage
            const execPromise = promisify(exec);
            const { stdout, stderr } = await execPromise(command);
            this.logInfo(stdout);
            this.logError(stderr);
            return true;
        } catch (error: unknown) {
            this.logError("Erreur lors du démarrage du serveur :", error instanceof Error ? error.message : String(error));
            return false;
        }
    }

    // Methode d'arrêt du serveur
    async stopServeur(serveur: ServeurInterface): Promise<boolean> {
        try {
            console.log(`🛑 Arrêt du serveur "${serveur.nom}"`);

            // Préparation de la commande d'arrêt
            const command = `${this.stopCommand} ${serveur.id}`;
            console.log(`Commande d'arrêt : ${command}`);

            // Exécution du script d'arrêt
            const execPromise = promisify(exec);
            const { stdout, stderr } = await execPromise(command);
            this.logInfo(stdout);
            this.logError(stderr);
            return true;
        } catch (error: unknown) {
            this.logError("Erreur lors de l'arrêt du serveur :", error instanceof Error ? error.message : String(error));
            return false;
        }
    }

    // Méthode d'installation du serveur
    async install(serveur: ServeurInterface): Promise<boolean> {
        try {
            execSync(`./installation.sh --serveur_loader_link=${serveur.path_serv} --serveur_path=${serveur.path_serv} --modpack_link=${serveur.modpack_url} --serveur_pack_link=${serveur.path_serv}`)
            return true;
        } catch (error) {
            this.logError("Erreur lors de l'installation du serveur :", error instanceof Error ? error.message : String(error));
            return false;
        }
    }

    // ---------------------------------------------------------------------------------------------------

    // Méthode pour récupérer le nombre de joueurs connectés au serveur
    async getPlayersCount(serveur: ServeurInterface): Promise<number> {
        try {
            // Vérification du jeu sur le serveur
            switch (serveur.jeu) {
                // Minecraft
                case "Minecraft":
                    try {
                        const playerCount = await this.getMinecraftPlayersCount(serveur);
                        return playerCount;
                    } catch (error) {
                        this.logError("Erreur lors de la récupération des joueurs Minecraft :", error instanceof Error ? error.message : String(error));
                        return 0;
                    }

                // Palworld
                case "Palworld":
                    try {
                        const playerCount = await this.getPalworldPlayers(serveur);
                        return playerCount;
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
    private async getMinecraftPlayersCount(serveur: ServeurInterface): Promise<number> {
        try {
            const serveurParameters = await ServiceServeur.repositoryServeurParameters.getFirstParameters();

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
    private async getPalworldPlayers(_: ServeurInterface): Promise<number> {
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


