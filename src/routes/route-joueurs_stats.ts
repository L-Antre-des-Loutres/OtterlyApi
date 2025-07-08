// src/routes/route-joueurs_stats.ts

import {Routes} from "./Routes";
import {Router} from "express";
import {ControllerJoueursStats} from "../controllers/controller-joueurs_stats";

/**
 * TODO
 */

export class RouteJoueursStats extends Routes{
    public router: Router;
    private readonly controller = new ControllerJoueursStats();

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesJoueursStats, "joueurs_stats");
        this.initializeRoutes();
    }

    private readonly RoutesJoueursStats: Routes[] = [
        {
            id: 50 ,
            alias: "otr-joueurs-stats-getAll",
            route: "/joueurs/stats-serveur",
            method: "GET",
            parameters: "",
            comment: "GET /api/joueurs/stats-serveur",
            description: "Obtenir toutes les statistiques de tous les joueurs des serveurs"
        },
        {
            id: 51 ,
            alias: "otr-joueurs-stats-getAllMin",
            route: "/joueurs/stats-serveur/minimum",
            method: "GET",
            parameters: "",
            comment: "GET /api/joueurs/stats-serveur/minimum",
        }
    ]


    private initializeRoutes() {
        // GET /api/joueurs/stats-serveur/
        this.router.get("/", async (req, res) => {
            try {
                await this.controller.getAll(req, res);
            } catch (error) {
                res.status(500).json({
                    error: "Une erreur est survenue lors de la recherche des routes.",
                });
            }
        });

        // GET /joueurs/stats-serveur/minimum/
        this.router.get("/minimum/", async (req, res) => {
            try {
                await this.controller.getAllMinStats(req, res);
            } catch (error) {
                res.status(500).json({
                    error: "Une erreur est survenue lors de la recherche des routes.",
                });
            }
        });
    }
}