import {Request, Response} from "express";
import {Controller} from "../../../otterly/abstractClass/controllers/Controller";
import {BadgesCategoriesModel} from "./CategoriesModel";

/**
 * Controller class for handling badge category-related API requests.
 * Extends the base Controller class and uses the BadgesCategoriesModel
 * for interacting with badge category data.
 */

export class BadgesCategoriesController extends Controller {
    constructor
    (
        private readonly model : BadgesCategoriesModel = new BadgesCategoriesModel({})
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