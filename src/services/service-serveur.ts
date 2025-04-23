// src/services/service-serveur.ts

import { exec } from "child_process";
import { promisify } from "util";
import { ServeurInterface } from "../interfaces/ServeurInterfaces";
import { Service } from "./Service";

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
            console.log(`🚀 Démarrage du serveur "${serveur.nom}" avec ${serveur.start_script}`);

            // Préparation de la commande de démarrage
            const command = `${this.startCommand} ${serveur.id}`;
            console.log(`Commande de démarrage : ${command}`);

            // Exécution du script de démarrage
            const execPromise = promisify(exec);
            const { stdout, stderr } = await execPromise(command);
            console.log(stdout);
            console.error(stderr);
            return true;
        } catch (error: unknown) {
            console.error("Erreur lors du démarrage du serveur :", error);
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
            console.error("Erreur lors de l'arrêt du serveur :", error);
            return false;
        }
    }
}


