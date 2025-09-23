import {Request, Response} from "express";
import {Controller} from "../../../otterly/abstractClass/controllers/Controller";
import {PalworldStatsModel} from "./PalworldStatsModel";

/**
 * Controller class responsible for handling statistics-related requests in the Palworld application.
 * Extends the base `Controller` class and interacts with the `PalworldStatsModel` to process and respond to client requests.
 */

export class PalworldStatsController extends Controller {
    constructor(
        private readonly model: PalworldStatsModel = new PalworldStatsModel({})
    ) {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /stats/
    async getAll(req: Request, res: Response) {
        try {
            const joueurs = await this.model.getAll();
            this.sendSuccess(res, joueurs);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /stats/total-hours/:id
    async getGameTimeByServeurId(req: Request, res: Response) {
        try {
            const totalPlaytime = await this.model.getGameTimeByServeurId(parseInt(req.params.id, 10));
            this.sendSuccess(res, totalPlaytime);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /stats/total-hours/
    async getAllGameTime(req: Request, res: Response) {
        try {
            const totalPlaytime = await this.model.getAllGameTime();
            this.sendSuccess(res, totalPlaytime);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}