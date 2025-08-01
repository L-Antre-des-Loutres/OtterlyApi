// src/controllers/ExampleController.ts

import {Request, Response} from "express";
import {Controller} from "../../otterly/abstractClass/controllers/Controller";
import {ExampleModel} from "./ExampleModel";

/**
 * TODO
 */

export class ExampleController extends Controller {
    constructor(
        private readonly model : ExampleModel = new ExampleModel({})
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
            const test = await this.model.getAll();
            this.sendSuccess(res, "Test réussi !");
        } catch (error) {
            this.handleError(res, error);
        }
    }
}