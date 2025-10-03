import {Routes} from "../../../otterly/abstractClass/routes/Routes";
import {CobblemonStatsController} from "./CobblemonStatsController";
import {Router} from "express";

/**
 * This class defines API routes for managing Cobblemon statistics. It extends the base `Routes` class
 * and implements functionality to handle incoming requests related to Cobblemon statistics, working
 * in conjunction with the `CobblemonStatsController`.
 *
 * The routes are registered dynamically and are safely structured to handle errors.
 */

export class CobblemonStatsRoutes extends Routes {

    public router: Router;

    // Initialisation du controller CobblemonStatsController
    private readonly controller = new CobblemonStatsController();

    private readonly RoutesList: Routes[] = [
        {
            id: 900,
            alias: "otr-cobblemon-stats-getAll",
            route: "/cobblemon/stats",
            method: "GET",
            parameters: "",
            comment: "GET /api/cobblemon/stats/",
            description: "Récupère l'ensemble des statistiques de Cobblemon."
        },
        {
            id: 901,
            alias: "otr-cobblemon-stats-getByCompteId",
            route: "/cobblemon/stats/:uid",
            method: "GET",
            parameters: "uid",
            comment: "GET /api/cobblemon/stats/:uid",
            description: "Récupère les statistiques de Cobblemon pour un compte spécifique."
        }
        ]

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // GET /cobblemon/stats
        this.router.get("/", Routes.safeHandler(
            (req, res) => this.controller.getAll(req, res),
            "Erreur lors de la récupération des statistiques Cobblemon."
        ));

        // GET /cobblemon/stats/:uid
       this.router.get("/:uid", Routes.safeHandler(
            (req, res) => this.controller.getByCompteId(req, res),
            "Erreur lors de la récupération des statistiques Cobblemon par UID."
       ));
    }
}