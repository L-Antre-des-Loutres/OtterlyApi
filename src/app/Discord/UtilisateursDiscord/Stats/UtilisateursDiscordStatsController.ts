import {Request, Response} from "express";
import {Controller} from "../../../../otterly/abstractClass/controllers/Controller";
import {UtilisateursDiscordStatsModel} from "./UtilisateursDiscordStatsModel";

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
        const {method, url} = req;
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

    // GET /utilisateurs_discord/stats/:discord_id
    async getByDiscordId(req: Request, res: Response) {
        try {
            const utilisateur = await this.model.getByUserId(req.body.id_utilisateur)
            this.sendSuccess(res, utilisateur)
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // POST /utilisateurs_discord/
    async create(req: Request, res: Response) {
        try {
            const newUtilisateur = await this.model.insert(req.body);
            this.sendSuccess(res, newUtilisateur, 201);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /utilisateurs_discord/stats/:id
    async getById(req: Request, res: Response) {
        try {
            const stats = await this.model.getByUserId(parseInt(req.params.id, 10));
            this.sendSuccess(res, stats);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // PUT /utilisateurs_discord/stats/
    async update(req: Request, res: Response) {
        try {
            const updatedStats = await this.model.update(req.body, req.body.id);
            this.sendSuccess(res, updatedStats);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}