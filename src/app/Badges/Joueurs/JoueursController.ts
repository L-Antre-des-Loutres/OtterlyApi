import {Request, Response} from "express";
import {Controller} from "../../../otterly/abstractClass/controllers/Controller";
import {BadgesJoueursModel} from "./JoueursModel";

/**
 * The BadgesJoueursController handles requests and operations related
 * to user badges. It provides methods for retrieving badges and handling
 * client requests.
 *
 * @extends Controller
 */

export class BadgesJoueursController extends Controller {
    constructor
    (
        private readonly model : BadgesJoueursModel = new BadgesJoueursModel({})
    )
    {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /badges/joueurs/
    async getAll(req: Request, res: Response) {
        try {
            const badges = await this.model.getAll();
            this.sendSuccess(res, badges);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /badges/joueurs/:id
    async getByPlayerId(req: Request, res: Response) {
        try {
            const badges = await this.model.getByPlayerId(parseInt(req.params.id, 10))
            this.sendSuccess(res, badges)
        } catch (error) {}
    }


}