import {Routes} from "../../../otterly/abstractClass/routes/Routes";
import {Router} from "express";
import {CobblemonCardController} from "./CobblemonCardController";

/**
 * The `CobblemonCardRoutes` class is responsible for defining the routes related to Cobblemon cards.
 * It extends the `Routes` class and includes the initialization and handling of specific HTTP routes
 * used to retrieve Cobblemon cards based on their unique identifiers (UID).
 */

export class CobblemonCardRoutes extends Routes {

    public router: Router;

    // Initialisation du service CobblemonStatsController
    private readonly controller = new CobblemonCardController();

    private readonly RoutesList: Routes[] = [
        {
            id: 1000,
            alias: "otr-cobblemon-card-getByUid",
            route: "/cobblemon/card/:uid",
            method: "GET",
            parameters: "",
            comment: "GET /api/cobblemon/card/:uid",
            description: "Récupère les cartes Cobblemon par UID."
        }
    ]

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // GET /cobblemon/card/:uid
        this.router.get("/", Routes.safeHandler(
            (req, res) => this.controller.getCard(req, res),
            "Erreur lors de la récupération des cartes Cobblemon."
        ));
    }
}