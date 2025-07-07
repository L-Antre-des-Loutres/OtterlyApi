import { Router } from "express";
import {ApiRoutesController} from "../controllers/controller-api_routes";

/**
 * Route pour obtenir toutes les routes de l'API
 * @author matheo-1712
 */

export class ApiRoute {
    public router: Router;
    private readonly controller = new ApiRoutesController();

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/", async (req, res) => {
            try {
                const routes = await this.controller.getAll(req, res);
                res.status(200).json(routes);
            } catch (error) {
                res.status(500).json({
                    error: "Une erreur est survenue lors de la recherche des routes.",
                });
            }
        });
    }
}