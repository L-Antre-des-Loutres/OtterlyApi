import {Router} from "express";
import {Routes} from "../../../otterly/abstractClass/routes/Routes";
import {BadgesJoueursController} from "./JoueursController";

/**
 * The `BadgesJoueursRoutes` class is responsible for defining the routes
 * related to fetching user badges in the system. It extends the base `Routes` class
 * and sets up the associated controller and route handlers.
 */

export class BadgesJoueursRoutes extends Routes {
    public router: Router;
    private readonly controller : BadgesJoueursController = new BadgesJoueursController();

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    private readonly RoutesList: Routes[] = [
        {
            alias: "otr-badges-joueurs-getAll",
            route: "/badges/joueurs",
            method: "GET",
            parameters: "",
            comment: "GET /api/badges/joueurs",
            description: ""
        },
        {
            alias: "otr-badges-joueurs-getByPlayerId",
            route: "/badges/joueurs/:id",
            method: "GET",
            parameters: "id",
            comment: "GET /api/badges/joueurs/:id",
        }
    ]

    private initializeRoutes() {
        // GET /api/badges/joueurs
        this.router.get("/", Routes.safeHandler(
            this.controller.getAll.bind(this.controller),
            "Une erreur est survenue lors de la récupération des badges des joueurs dans l'API."
        ));

        // GET /api/badges/joueurs/:id
        this.router.get("/:id", Routes.safeHandler(
            (req, res) => this.controller.getByPlayerId(req, res),
            "Erreur lors de la récupération des badges pour cette ID."
        ));

    }
}