import { Request, Response } from "express";
import { Controller } from "../../../../otterly/abstractClass/controllers/Controller";
import { UtilisateursDiscordStatsModel } from "./UtilisateursDiscordStatsModel";

/**
 * UtilisateursDiscordController is a controller class that manages the operations
 * related to the "utilisateurs_discord" resource. It extends a base `Controller`
 * class and interacts with the associated data model to handle requests and send
 * responses.
 *
 * The controller is responsible for handling HTTP requests such as retrieving
 * information about all "utilisateurs_discord".
 */

export class UtilisateursDiscordStatsController extends Controller {
    constructor(
        private readonly model: UtilisateursDiscordStatsModel = new UtilisateursDiscordStatsModel({})
    ) {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const { method, url } = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /utilisateurs_discord/stats/
    async getAll(req: Request, res: Response) {
        try {
            const stats = await this.model.getAll();
            this.sendSuccess(res, stats);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /utilisateurs_discord/stats/:id
    async getByUserId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return this.sendError(res, "ID invalide.", 400);
            }

            const stats = await this.model.getByUserId(id);
            if (!stats || (Array.isArray(stats) && stats.length === 0)) {
                return this.sendNotFound(res, "Stats introuvables pour cet utilisateur.");
            }

            this.sendSuccess(res, stats);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // POST /utilisateurs_discord/stats/create
    async create(req: Request, res: Response) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return this.sendError(res, "Le corps de la requête est vide.", 400);
            }
            const newUtilisateur = await this.model.insert(req.body);
            this.sendSuccess(res, newUtilisateur, 201);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // PUT /utilisateurs_discord/stats/update
    async update(req: Request, res: Response) {
        try {
            const { id } = req.body;
            if (!id) {
                return this.sendError(res, "L'ID est requis pour la mise à jour.", 400);
            }

            const updatedStats = await this.model.update(req.body, id);
            this.sendSuccess(res, updatedStats);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}