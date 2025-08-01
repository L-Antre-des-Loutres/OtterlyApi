// src/controllers/ApiRoutesController.ts

import { Request, Response } from "express";
import {Controller} from "./Controller";
import {ApiRoutesModel} from "../models/ApiRoutesModel";

/**
 * ApiRoutesController class
 * @classdesc This class represents an API routes controller.
 * @extends Controller
 * @author matheo-1712
 */

export class ApiRoutesController extends Controller {

    constructor(
        private readonly model: ApiRoutesModel = new ApiRoutesModel({})
    ) {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /api/routes : Obtenir toutes les routes
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const routes = await this.model.getAll();
            this.sendSuccess(res, routes);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}