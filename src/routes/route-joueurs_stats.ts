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
        Routes.registerRoutes(this.RoutesJoueursStats, "");
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
        },
        {
         id: 52,
         alias: "otr-joueurs-stats-getTotalServeurHours",
         route: "/joueurs/stats-serveur/serveurs-total-playtime",
         method: "GET",
         parameters: "",
         comment: "GET /api/joueurs/stats-serveur/serveurs-total-hours",
         description: "Obtenir le nombre total de playtime Minecraft de l'ensemble des joueurs des serveurs (à convertir en heures)"
        },
        {
            id: 53,
            alias: "otr-joueurs-stats-getTotalHoursPerServer",
            route: "/joueurs/stats-serveur/serveurs-total-playtime-per-server",
            method: "GET",
            parameters: "",
            comment: "GET /api/joueurs/stats-serveur/serveurs-total-hours-per-server",
            description: "Obtenir le nombre total de playtime Minecraft de l'ensemble des joueurs pour chaque serveur (à convertir en heures)"
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

        // GET /joueurs/stats-serveur/serveurs-total-hours/
        this.router.get("/serveurs-total-playtime/", async (req, res) => {
            try {
                await this.controller.getTotalServeurHours(req, res);
            } catch (error) {
                res.status(500).json({})
            }
        })

        // GET /joueurs/stats-serveur/serveurs-total-hours-per-server/
        this.router.get("/serveurs-total-playtime-per-server/", async (req, res) => {
            try {
                await this.controller.getTotalHoursPerServer(req, res);
            } catch (error) {}
        })
    }
}