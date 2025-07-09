// src/controllers/controller-astroloutre_image.ts

import {Controller} from "./Controller";
import {Request, Response} from "express";
import {ModelAstroloutreImage} from "../models/model-astroloutre_image";

/**
 * TODO
 */

export class ControllerAstroLoutreImage extends Controller {
    constructor(
        private readonly model : ModelAstroloutreImage = new ModelAstroloutreImage({})
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