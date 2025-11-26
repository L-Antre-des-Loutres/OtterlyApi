import {Request, Response} from "express";
import {Controller} from "../../../otterly/abstractClass/controllers/Controller";
import {UtilisateursDiscordModel} from "./UtilisateursDiscordModel";

/**
 * UtilisateursDiscordController is a controller class that manages the operations
 * related to the "utilisateurs_discord" resource. It extends a base `Controller`
 * class and interacts with the associated data model to handle requests and send
 * responses.
 *
 * The controller is responsible for handling HTTP requests such as retrieving
 * information about all "utilisateurs_discord".
 */

export class UtilisateursDiscordController extends Controller {
    constructor(
        private readonly model : UtilisateursDiscordModel = new UtilisateursDiscordModel({})
    ) {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /utilisateurs_discord/
    async getAll(req: Request, res: Response) {
        try {
            const images = await this.model.getAll();
            this.sendSuccess(res, images);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /utilisateurs_discord/:id
    async getById(req: Request, res: Response) {
        try {
            const utilisateur = await this.model.getById(parseInt(req.params.id, 10))
            this.sendSuccess(res, utilisateur)
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /utilisateurs_discord/by_discord_id/:discord_id
    async getByDiscordId(req: Request, res: Response) {
        try {
            const utilisateur = await this.model.getByDiscordId(req.params.discord_id)
            this.sendSuccess(res, utilisateur)
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // POST /utilisateurs_discord/
    async create(req: Request, res: Response) {
        try {
            const newUtilisateur = await this.model.create(req.body);
            this.sendSuccess(res, newUtilisateur, 201);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // PUT /utilisateurs_discord/:id
    async update(req: Request, res: Response) {
        try {
            const updatedUtilisateur = await this.model.update(req.body, req.body.id);
            this.sendSuccess(res, updatedUtilisateur);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // PUT /utilisateurs_discord/data_suppression_date/
    async updateDataSuppressionDate(req: Request, res: Response) {
        try {
            const result = await this.model.updateDataSuppressionDate(req.body.discord_id);
            this.sendSuccess(res, result);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // PUT /utilisateurs_discord/data_suppression_reset_date/
    async resetDataSuppressionDate(req: Request, res: Response) {
        try {
            const result = await this.model.resetDataSuppressionDate(req.body.discord_id);
            this.sendSuccess(res, result);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // PUT /utilisateurs_discord/vocal/
    async updateVocalTime(req: Request, res: Response) {
        try {
            const updatedUtilisateur = await this.model.updateVocalTime(req.body.id, req.body.vocal_time);
            this.sendSuccess(res, updatedUtilisateur);
        } catch (error) {
        }
    }

    // PUT /utilisateurs_discord/nb_message/
    async updateNbMessage(req: Request, res: Response) {
        try {
            const updatedUtilisateur = await this.model.updateNbMessage(req.body.id, req.body.nb_message);
            this.sendSuccess(res, updatedUtilisateur);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // PUT /utilisateurs_discord/activity/
    async updateActivity(req: Request, res: Response) {
        try {
            const updatedUtilisateur = await this.model.updateLastActivity(req.body.id);
            this.sendSuccess(res, updatedUtilisateur);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}