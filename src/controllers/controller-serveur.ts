// src/controllers/controller-serveur.ts

import { Request, Response } from "express";
import { ModelServeur } from "../models/model-serveur";
import { Controller } from "./Controller";
import { ServeurMinecraftInstallationInterface } from "../interfaces/ServeurInstallationInterfaces";

/**
 * The ControllerServeur class is a specialized controller that handles HTTP requests and responses
 * for server management operations. It extends the base Controller class and provides various
 * methods for managing servers, such as retrieving server details, creating, deleting, starting,
 * stopping, and installing servers.
 * - `handleRequest` is an abstract method that must be implemented by any subclass to define specific route handling logic.
 * - `getServeurs` retrieves all server details.
 * - `getById` retrieves the details of a specific server by its ID.
 * - `getServeursPrimaireSecondaire` retrieves the details of all primary and secondary servers.
 * - `create` creates a new server.
 * - `delete` deletes a server by its ID.
 * - `start` starts a server by its ID.
 * - `stop` stops a server by its ID.
 * - `install` installs a server.
 */

export class ControllerServeur extends Controller {
    handleRequest(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

    // GET /api/serveurs
    public async getServeurs(req: Request, res: Response): Promise<void> {
        try {
            const serveurs = await ModelServeur.getAll();
            this.sendSuccess(res, serveurs);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /api/serveurs/infos/:id
    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const serveur = await ModelServeur.getById(parseInt(req.params.id, 10));
            if (!serveur) {
                this.sendError(res, "Serveur introuvable");
                return;
            }
            this.sendSuccess(res, serveur);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /api/serveurs/primaire-secondaire
    public async getServeursPrimaireSecondaire(req: Request, res: Response): Promise<void> {
        try {
            const serveurs = await ModelServeur.getStartedServeursInfo();

            // Ajout des joueurs en ligne pour chaque serveur
            if (!serveurs) {
                this.sendError(res, "Serveurs introuvables");
                return;
            }

            // TODO : Refaire cette ligne plus tard en supprimant le ANY et en corrigeant le soucis du non renvoie de nb_players autrement.
            this.sendSuccess(res, serveurs.map(s => Object.getOwnPropertyNames(s).reduce((acc, key) => { acc[key] = s[key as keyof typeof s]; return acc; }, {} as any)));
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // POST /api/serveurs
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const serveur = await ModelServeur.create(req.body);
            this.sendSuccess(res, serveur);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // DELETE /api/serveurs
    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const serveur = await ModelServeur.delete(req.body.id);
            this.sendSuccess(res, serveur);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // ---------------- MÉTHODES GESTION DU LANCEMENT / ARRET DU SERVEUR / INSTALLATION ------------------

    // POST /api/serveurs/start/
    public async start(req: Request, res: Response): Promise<void> {
        try {
            const serveur = await ModelServeur.getById(req.body.id);
            if (!serveur) {
                this.sendNotFound(res, "Serveur introuvable");
                return;
            }
            if (await ModelServeur.start(serveur)) {
                this.sendSuccess(res, serveur);
            } else {
                this.sendError(res, "Erreur lors du lancement du serveur");
            }
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // POST /api/serveurs/stop/
    public async stop(req: Request, res: Response): Promise<void> {
        try {
            const serveur = await ModelServeur.getById(req.body.id);
            if (!serveur) {
                this.sendNotFound(res, "Serveur introuvable");
                return;
            }
            if (await ModelServeur.stop(serveur)) {
                this.sendSuccess(res, serveur);
            } else {
                this.sendError(res, "Erreur lors de l'arrêt du serveur");
            }
            this.sendSuccess(res, serveur);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // POST /api/serveurs/installation/
    public async install(req: Request, res: Response): Promise<void> {
        try {
            const serveurInstallation : ServeurMinecraftInstallationInterface = req.body.serveurInstallation;
            this.sendSuccess(res, await ModelServeur.install(serveurInstallation));
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // ---------------------------------------------------------------------------------------------------
}
