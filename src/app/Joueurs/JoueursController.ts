import {Request, Response} from "express";
import {Controller} from "../../otterly/abstractClass/controllers/Controller";
import {JoueursModel} from "./JoueursModel";

/**
 * Controller responsible for handling requests related to the "joueurs" resource.
 * Extends the base Controller functionality and interacts with the JoueursModel
 * to retrieve and manipulate player data.
 */

export class JoueursController extends Controller {
    constructor(
        private readonly model: JoueursModel = new JoueursModel({})
    ) {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /joueurs/
    async getAll(req: Request, res: Response) {
        try {
            const joueurs = await this.model.getAll();
            this.sendSuccess(res, joueurs);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}