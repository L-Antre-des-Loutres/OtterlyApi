// src/routes/route-joueurs

import {Routes} from "./Routes";
import {ControllerJoueurs} from "../controllers/controller-joueurs";
import {Router} from "express";

/**
 * TODO
 */

export class RouteJoueurs extends Routes {
    public router: Router;
    private readonly controller = new ControllerJoueurs();

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    private readonly RoutesList: Routes[] = [
        {
            id: 500,
            alias: "otr-joueurs-getAll",
            route: "/joueurs",
            method: "GET",
            parameters: "",
            comment: "GET /api/joueurs",
            description: "Obtenir toutes les images astroloutre"
        },
    ]

    private initializeRoutes() {
        // GET /joueurs
        this.router.get("/", async (req, res) => {
            try {
                await this.controller.getAll(req, res);
            } catch (error) {
                res.status(500).json({
                    error: "Une erreur est survenue lors de la recherche des routes.",
                });
            }
        });
    }
}