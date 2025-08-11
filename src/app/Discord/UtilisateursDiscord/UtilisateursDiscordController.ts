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
}