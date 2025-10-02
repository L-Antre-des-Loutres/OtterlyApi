import {Controller} from "../../../otterly/abstractClass/controllers/Controller";
import {Request, Response} from "express";
import {CobblemonCardService} from "./CobblemonCardService";

/**
 * CobblemonStatsController is responsible for handling requests related to
 * Cobblemon statistics. It interacts with the service layer to retrieve the
 * necessary data and sends appropriate responses to the client.
 *
 * Extends the base Controller class.
 *
 * Constructor initializes the controller with an instance of CobblemonCardService.
 *
 * Methods:
 * - handleRequest: Handles incoming requests, logs the method and URL, and sends a success response.
 * - getAll: Asynchronously fetches all Cobblemon stats data, sends the data on success, and handles errors appropriately.
 */

export class CobblemonCardController extends Controller {

    constructor(
        private readonly service: CobblemonCardService = new CobblemonCardService()
    ) {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /cobblemon/stats/
    async getCard(req: Request, res: Response) {
        try {
            const stats = await this.service.getCard();
            this.sendSuccess(res, stats);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}