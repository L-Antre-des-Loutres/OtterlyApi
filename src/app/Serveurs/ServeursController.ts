import {Request, Response} from "express";
import {Controller} from "../../otterly/abstractClass/controllers/Controller";
import {ServeursModel} from "./ServeursModel";

/**
 * ServeurController is responsible for handling requests related to server management operations.
 * It provides methods to retrieve, create, delete, and manage the state of servers.
 * The controller interacts with `ServeurModel` to process server-related data.
 * It extends the base `Controller` class to utilize shared functionality like response handling and error management.
 */

export class ServeursController extends Controller {
    handleRequest(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

    // GET /api/serveurs
    public async getServeurs(req: Request, res: Response): Promise<void> {
        try {
            const serveurs = await ServeursModel.getAll();
            this.sendSuccess(res, serveurs);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /api/serveurs/infos/:id
    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const serveur = await ServeursModel.getById(parseInt(req.params.id, 10));
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
            const serveurs = await ServeursModel.getServeursActifGlobal();
            this.sendSuccess(res, serveurs);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /api/serveurs/actif-global/:jeu
    public async getServeursActifEtGlobalByGame(req: Request, res: Response): Promise<void> {
        try {
            const serveurs = await ServeursModel.getServeursActifGlobalByGame(req.params.jeu);
            this.sendSuccess(res, serveurs);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /api/serveurs/primaire-secondaire
    public async getServeursPrimaireSecondaire(req: Request, res: Response): Promise<void> {
        try {
            const serveurs = await ServeursModel.getStartedServeurs();

            // Ajout des joueurs en ligne pour chaque serveur
            if (!serveurs) {
                this.sendError(res, "Serveurs introuvables");
                return;
            }
            this.sendSuccess(res, serveurs);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // POST /api/serveurs
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const serveur = await ServeursModel.create(req.body);
            this.sendSuccess(res, serveur);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // DELETE /api/serveurs
    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const serveur = await ServeursModel.delete(req.body.id);
            this.sendSuccess(res, serveur);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // ---------------- MÉTHODES GESTION DU LANCEMENT / ARRET DU SERVEUR / INSTALLATION ------------------
    // ---------------------------------------------------------------------------------------------------
}