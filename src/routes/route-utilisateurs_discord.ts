// src/routes/route-utilisateurs_discord.ts

import {Routes} from "./Routes";
import {Router} from "express";
import {ControllerUtilisateursDiscord} from "../controllers/controller-utilisateurs_discord";

/**
 * TODO
 */

export class RouteUtilisateursDiscord extends Routes{
    public router: Router;
    private readonly controller = new ControllerUtilisateursDiscord();

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }
    private readonly RoutesList: Routes[] = [
        {
            id: 300,
            alias: "otr-utilisateursDiscord-getAll",
            route: "/utilisateurs_discord",
            method: "GET",
            parameters: "",
            comment: "GET /api/utilisateurs_discord/",
            description: "Obtenir toutes les images astroloutre"
        },
    ]

    private initializeRoutes() {
        // GET /utilisateurs_discord/
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