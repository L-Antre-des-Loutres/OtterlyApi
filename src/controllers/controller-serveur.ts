import { Request, Response } from "express";
import { ModelServeur } from "../models/model-serveur";
import { Controller } from "./Controller";

export class ControllerServeur extends Controller {
    handleRequest(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

    // GET /api/serveurs
    public async getServeurs(req: Request, res: Response): Promise<void> {
        try {
            const serveurs = await ModelServeur.getAll();
            this.sendSuccess(res, serveurs);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}
