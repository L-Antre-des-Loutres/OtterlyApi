import {Request, Response} from "express";
import {Controller} from "../../../otterly/abstractClass/controllers/Controller";
import {BadgesUtilisateursModel} from "./UtilisateursModel";

/**
 * The BadgesUtilisateursController handles requests and operations related
 * to user badges. It provides methods for retrieving badges and handling
 * client requests.
 *
 * @extends Controller
 */

export class BadgesUtilisateursController extends Controller {
    constructor
    (
        private readonly model : BadgesUtilisateursModel = new BadgesUtilisateursModel({})
    )
    {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /astroloutre/badges/
    async getAll(req: Request, res: Response) {
        try {
            const images = await this.model.getAll();
            this.sendSuccess(res, images);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}