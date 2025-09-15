
import {Router} from "express";
import {Routes} from "../../otterly/abstractClass/routes/Routes";
import {JoueursController} from "./JoueursController";

/**
 * JoueursRoutes is responsible for defining and registering routes related to "joueurs".
 * It extends the base Routes class and initializes specific routes and their corresponding logic.
 */

export class JoueursRoutes extends Routes {
    public router: Router;
    private readonly controller = new JoueursController();

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
            description: "Récupère tous les joueurs."
        },
    ]

    private initializeRoutes() {
        // GET /joueurs
        this.router.get("/", Routes.safeHandler(
            (req, res) => this.controller.getAll(req, res),
            "Erreur lors de la récupération de tous les joueurs."
        ));
    }
}