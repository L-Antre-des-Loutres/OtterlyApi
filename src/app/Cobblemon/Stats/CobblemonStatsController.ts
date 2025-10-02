import {Controller} from "../../../otterly/abstractClass/controllers/Controller";
import {Request, Response} from "express";
import {CobblemonStatsModel} from "./CobblemonStatsModel";

/**
 * Controller class for managing Cobblemon stats-related operations.
 * Responsible for handling HTTP requests, retrieving data from the model,
 * and sending appropriate responses to the client.
 */

export class CobblemonStatsController extends Controller {

    constructor(
        private readonly model: CobblemonStatsModel = new CobblemonStatsModel({})
    ) {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /cobblemon/stats/
    async getAll(req: Request, res: Response) {
        try {
            const stats = await this.model.getAll();
            this.sendSuccess(res, stats);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}