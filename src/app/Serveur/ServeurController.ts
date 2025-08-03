import { Request, Response } from "express";
import {Controller} from "../../otterly/abstractClass/controllers/Controller";
import {ServeurModel} from "./ServeurModel";

/**
 * ServeurController is responsible for handling requests related to server management operations.
 * It provides methods to retrieve, create, delete, and manage the state of servers.
 * The controller interacts with `ServeurModel` to process server-related data.
 * It extends the base `Controller` class to utilize shared functionality like response handling and error management.
 */

export class ServeurController extends Controller {
    handleRequest(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

    // GET /api/serveurs
    public async getServeurs(req: Request, res: Response): Promise<void> {
        try {
            const serveurs = await ServeurModel.getAll();
            this.sendSuccess(res, serveurs);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /api/serveurs/infos/:id
    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const serveur = await ServeurModel.getById(parseInt(req.params.id, 10));
            if (!serveur) {
                this.sendError(res, "Serveur introuvable");
                return;
            }
            this.sendSuccess(res, serveur);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /api/serveurs/actif-global
    public async getServeursActifEtGlobal(req: Request, res: Response): Promise<void> {
        try {
            const serveurs = await ServeurModel.getServeursActifGlobal();
            this.sendSuccess(res, serveurs);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /api/serveurs/actif-global/:jeu
    public async getServeursActifEtGlobalByGame(req: Request, res: Response): Promise<void> {
        try {
            const serveurs = await ServeurModel.getServeursActifGlobalByGame(req.params.jeu);
            this.sendSuccess(res, serveurs);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /api/serveurs/primaire-secondaire
    public async getServeursPrimaireSecondaire(req: Request, res: Response): Promise<void> {
        try {
            const serveurs = await ServeurModel.getStartedServeursInfo();

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
            const serveur = await ServeurModel.create(req.body);
            this.sendSuccess(res, serveur);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // DELETE /api/serveurs
    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const serveur = await ServeurModel.delete(req.body.id);
            this.sendSuccess(res, serveur);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // ---------------- MÉTHODES GESTION DU LANCEMENT / ARRET DU SERVEUR / INSTALLATION ------------------

    // POST /api/serveurs/start/
    public async start(req: Request, res: Response): Promise<void> {
        try {
            const serveur = await ServeurModel.getById(req.body.id);
            if (!serveur) {
                this.sendNotFound(res, "Serveur introuvable");
                return;
            }

            const started = await ServeurModel.start(serveur);
            if (started) {
                this.sendSuccess(res, serveur);
            } else {
                this.sendError(res, "Erreur lors du lancement du serveur");
            }
        } catch (error) {
            this.handleError(res, error);
        }
    }
    // ---------------------------------------------------------------------------------------------------
}