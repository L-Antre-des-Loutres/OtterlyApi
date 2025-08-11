import {Request, Response} from "express";
import {Controller} from "../../../otterly/abstractClass/controllers/Controller";
import {AstroloutreImagesModel} from "./ImagesModel";

/**
 * Controller responsible for handling requests related to Astroloutre images.
 * Extends the base Controller class to provide HTTP request handling functionalities.
 */

export class AstroloutreImagesController extends Controller {
    constructor(
        private readonly model : AstroloutreImagesModel = new AstroloutreImagesModel({})
    ) {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /astroloutre/images/
    async getAll(req: Request, res: Response) {
        try {
            const images = await this.model.getAll();
            this.sendSuccess(res, images);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /astroloutre/images/:jeu
    async getByGame(req: Request, res: Response) {
        try {
            const images = await this.model.getByGame(req.params.jeu);
            this.sendSuccess(res, images);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}