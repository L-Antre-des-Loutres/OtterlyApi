// src/controllers/controller-utilisateurs_discord.ts

import {Controller} from "./Controller";
import {Request, Response} from "express";
import {ModelUtilisateursDiscord} from "../models/model-utilisateurs_discord";

/**
 * TODO
 */

export class ControllerUtilisateursDiscord extends Controller {
    constructor(
        private readonly model : ModelUtilisateursDiscord = new ModelUtilisateursDiscord({})
    ) {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /utilisateurs_discord/
    async getAll(req: Request, res: Response) {
        try {
            const images = await this.model.getAll();
            this.sendSuccess(res, images);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}