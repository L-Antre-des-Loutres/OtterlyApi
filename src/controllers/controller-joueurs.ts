import {Controller} from "./Controller";
import {Request, Response} from "express";
import {ModelJoueurs} from "../models/model-joueurs";

export class ControllerJoueurs extends Controller {
    constructor(
        private readonly model: ModelJoueurs = new ModelJoueurs({})
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