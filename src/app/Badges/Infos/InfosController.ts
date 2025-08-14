import {Request, Response} from "express";
import {Controller} from "../../../otterly/abstractClass/controllers/Controller";
import {BadgesInfosModel} from "./InfosModel";

/**
 * Controller responsible for handling requests related to Astroloutre images.
 * Extends the base Controller class to provide HTTP request handling functionalities.
 */

export class BadgesInfosController extends Controller {
    constructor
    (
        private readonly model : BadgesInfosModel = new BadgesInfosModel({})
    )
    {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /badges/
    async getAll(req: Request, res: Response) {
        try {
            const images = await this.model.getAll();
            this.sendSuccess(res, images);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /badges/infos/:id
    async getById(req: Request, res: Response) {
        try {
            const badgeInfo = await this.model.getById(parseInt(req.params.id, 10))
            this.sendSuccess(res, badgeInfo)
        } catch (error) {
            this.handleError(res, error)
        }
    }

    // GET /badges/infos/catégories/:id
    async getByCategorieId(req: Request, res: Response) {
        try {
            const badgePerCategorie = await this.model.getByCategorieId(parseInt(req.params.categorie_id, 10))
            this.sendSuccess(res, badgePerCategorie)
        } catch (error) {
            this.handleError(res, error)
        }
    }
}