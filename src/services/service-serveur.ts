// src/services/service-serveur.ts

import { exec } from "child_process";
import { promisify } from "util";
import { ServeurInterface } from "../interfaces/ServeurInterfaces";
import { Service } from "./Service";
import axios from "axios";

export class ServiceServeur extends Service {

    // Commande pour lancer le serveur
    private readonly startCommand: string;

    // Commande pour arrêter le serveur
    private readonly stopCommand: string;

    constructor() {
        super("Serveur - Service");
        this.startCommand = "serversentinel start-server";
        this.stopCommand = "serversentinel stop-server";
    }

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
            console.log(stdout);
            console.error(stderr);
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
            console.log(stdout);
            console.error(stderr);
            return true;
        } catch (error: unknown) {
            this.logError("Erreur lors de l'arrêt du serveur :", error instanceof Error ? error.message : String(error));
            return false;
        }
    }

    // Méthode pour récupérer le nombre de joueurs connectés au serveur
    async getPlayersCount(serveur: ServeurInterface): Promise<number> {
        try {
            // Vérification du jeu sur le serveur
            switch (serveur.jeu) {

                // Minecraft
                case "Minecraft":
                    return 0;

                // Palworld
                case "Palworld":
                    try {
                        // Envoie une requête GET à l'API de Palworld pour récupérer le nombre de joueurs
                        let config = {
                            method: 'get',
                            maxBodyLength: Infinity,
                            url: 'http://localhost:8212/v1/api/players',

                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': process.env.PALWORLD_STRING ?? "",
                            },
                        };
                        const response = await axios(config);

                        // Vérifie si la réponse est valide
                        if (response.status === 200) {
                            const players = Array.isArray(response.data.players) ? response.data.players : [];
                            return players.length;
                        } else {
                            console.log(response.status);
                            return 0;
                        }
                    } catch (error) {
                        console.log("Erreur lors de la récupération des joueurs :", error);
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
}


