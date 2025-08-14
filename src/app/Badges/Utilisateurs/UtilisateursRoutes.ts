import {Router} from "express";
import {Routes} from "../../../otterly/abstractClass/routes/Routes";
import {BadgesUtilisateursController} from "./UtilisateursController";

/**
 * The `BadgesUtilisateursRoutes` class is responsible for defining the routes
 * related to fetching user badges in the system. It extends the base `Routes` class
 * and sets up the associated controller and route handlers.
 */

export class BadgesUtilisateursRoutes extends Routes {
    public router: Router;
    private readonly controller : BadgesUtilisateursController = new BadgesUtilisateursController();

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    private readonly RoutesList: Routes[] = [
        {
            alias: "otr-badges-utilisateurs-getAll",
            route: "/badges/utilisateurs",
            method: "GET",
            parameters: "",
            comment: "GET /api/badges/utilisateurs",
            description: ""
        },
        {
            alias: "otr-badges-utilisateurs-getByUserId",
            route: "/badges/utilisateurs/:id",
            method: "GET",
            parameters: "id",
            comment: "GET /api/badges/utilisateurs/:id",
        }
    ]

    private initializeRoutes() {
        // GET /api/badges/utilisateurs
        this.router.get("/", Routes.safeHandler(
            this.controller.getAll.bind(this.controller),
            "Une erreur est survenue lors de la récupération des badges des utilisateurs dans l'API."
        ));

        // GET /api/badges/utilisateurs/:id
        this.router.get("/:id", Routes.safeHandler(
            (req, res) => this.controller.getByUserId(req, res),
            "Erreur lors de la récupération des badges pour cette ID."
        ));

    }
}