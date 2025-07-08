// src/controllers/controller-joueurs_stats.ts

import {Controller} from "./Controller";
import {Request, Response} from "express";
import {ModelJoueursStats} from "../models/model-joueurs_stats";

/**
 * TODO
 */

export class ControllerJoueursStats extends Controller {
    constructor(
        private readonly model: ModelJoueursStats = new ModelJoueursStats({})
    ) {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /joueurs/stats-serveur/
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const stats = await this.model.getAll();
            this.sendSuccess(res, stats);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /joueurs/stats-serveur/minimum/
    async getAllMinStats(req: Request, res: Response): Promise<void> {
        try {
            const stats = await this.model.getAllMinStats();
            this.sendSuccess(res, stats);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}