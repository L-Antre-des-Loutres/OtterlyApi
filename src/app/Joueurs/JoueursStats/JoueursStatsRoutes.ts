// src/routes/route-joueurs_stats.ts

import {Router} from "express";
import {JoueursStatsController} from "./JoueursStatsController";
import {Routes} from "../../../otterly/abstractClass/routes/Routes";

/**
 * RouteJoueursStats is responsible for defining routes related to player statistics and handling requests for these routes.
 * This class extends the `Routes` class and implements specific endpoints for managing and retrieving player-related statistical data.
 */

export class JoueursStatsRoutes extends Routes{
    public router: Router;
    private readonly controller = new JoueursStatsController();

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
        },
        {
            id: 54,
            alias: "otr-joueurs-stats-getByUid",
            route: "/joueurs/stats-serveur/per-server-uid/:uid",
            method: "GET",
            parameters: "uid",
            comment: "GET /api/joueurs/stats-serveur/per-server-uid/:uid",
            description: "Obtenir les statistiques d'un joueur pour son uid"
        },
        {
            id: 55,
            alias: "otr-joueurs-totalStats-getByUid",
            route: "/joueurs/stats-serveur/total-stats-uid/:uid",
            method: "GET",
            parameters: "uid",
            comment: "GET /api/joueurs/stats-serveur/total-stats-uid/:uid",
            description: "Obtenir le total des statistiques d'un joueur pour son uid"
        },
        {
            id: 56,
            alias: "otr-joueurs-stats-getStatsByServer",
            route: "/joueurs/stats-serveur/stats-by-server/:id",
            method: "GET",
            parameters: "id",
            comment: "GET /api/joueurs/stats-serveur/stats-by-server/:id",
            description: "Obtenir les statistiques de l'ensemble des joueurs par serveur"
        }
    ]


    private initializeRoutes() {
        // GET /api/joueurs/stats-serveur/
        this.router.get("/", async (req, res) => {
            try {
                await this.controller.getAll(req, res);
            } catch (error) {}
        });

        // GET /joueurs/stats-serveur/minimum/
        this.router.get("/minimum/", async (req, res) => {
            try {
                await this.controller.getAllMinStats(req, res);
            } catch (error) {}
        });

        // GET /joueurs/stats-serveur/serveurs-total-hours/
        this.router.get("/serveurs-total-playtime/", async (req, res) => {
            try {
                await this.controller.getTotalServeurHours(req, res);
            } catch (error) {}
        })

        // GET /joueurs/stats-serveur/serveurs-total-hours-per-server/
        this.router.get("/serveurs-total-playtime-per-server/", async (req, res) => {
            try {
                await this.controller.getTotalHoursPerServer(req, res);
            } catch (error) {}
        })

        // GET /joueurs/stats-serveur/per-server-uid/:uid
        this.router.get("/per-server-uid/:uid", async (req, res) => {
            try {
                await this.controller.getByUid(req, res);
            } catch (error) {}
        })

        // GET /joueurs/stats-serveur/total-stats-uid/:uid
        this.router.get("/total-stats-uid/:uid", async (req, res) => {
            try {
                await this.controller.getTotalStatsByUid(req, res);
            } catch (error) {}
        })

        // GET /joueurs/stats-serveur/stats-by-server/:id
        this.router.get("/stats-by-server/:id", async (req, res) => {
            try {
                await this.controller.getStatsByServer(req, res);
            } catch (error) {}
        })
    }
}