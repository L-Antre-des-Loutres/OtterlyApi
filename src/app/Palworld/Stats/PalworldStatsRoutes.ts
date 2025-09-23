import {Router} from "express";
import {Routes} from "../../../otterly/abstractClass/routes/Routes";
import {PalworldStatsController} from "./PalworldStatsController";

/**
 * Class representing the routes for Palworld statistics.
 * Extends the base `Routes` class to handle API endpoints related to Palworld stats.
 */

export class PalworldStatsRoutes extends Routes {
    public router: Router;
    private readonly controller = new PalworldStatsController();
    private readonly RoutesList: Routes[] = [
        {
            id: 800,
            alias: "otr-palworld-stats-getAll",
            route: "/palworld/stats",
            method: "GET",
            parameters: "",
            comment: "GET /api/palworld/stats/",
            description: "Récupère l'ensemble des statistiques de Palworld."
        },
        {
            id: 801,
            alias: "otr-palworld-stats-getTotalGameTime",
            route: "/palworld/stats/total-hours",
            method: "GET",
            parameters: "",
            comment: "GET /api/palworld/stats/total-hours/",
            description: "Récupère l'ensemble du temps de jeu total de Palworld."
        },
        {
            id: 802,
            alias: "otr-palworld-stats-getTotalGameTime-by-serveur_id",
            route: "/palworld/stats/total-hours/:id",
            method: "GET",
            parameters: "",
            comment: "GET /api/palworld/stats/total-hours/:id",
            description: "Récupère l'ensemble du temps de jeu total de Palworld par serveur_id."
        }
    ]

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // GET /stats
        this.router.get("/", Routes.safeHandler(
            (req, res) => this.controller.getAll(req, res),
            "Erreur lors de la récupération des statistiques Palworld."
        ));

        // GET /stats/total-hours/:id
        this.router.get("/total-hours/:id", Routes.safeHandler(
            (req, res) => this.controller.getGameTimeByServeurId(req, res),
            "Erreur lors de la récupération du serveur Palworld par ID."
        ));

        // GET /stats/total-hours/
        this.router.get("/total-hours/", Routes.safeHandler(
            (req, res) => this.controller.getAllGameTime(req, res),
            "Erreur lors de la récupération du total d'heures de jeu de Palworld."
        ));
    }
}