import {Request, Response} from "express";
import {Controller} from "../../../otterly/abstractClass/controllers/Controller";
import {AstroloutreBadgesInfosModel} from "./InfosModel";

/**
 * Controller responsible for handling requests related to Astroloutre images.
 * Extends the base Controller class to provide HTTP request handling functionalities.
 */

export class AstroloutreBadgesInfosController extends Controller {
    constructor
    (
        private readonly model : AstroloutreBadgesInfosModel = new AstroloutreBadgesInfosModel({})
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