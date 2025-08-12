import {Router} from "express";
import {Routes} from "../../../otterly/abstractClass/routes/Routes";
import {BadgesInfosController} from "./InfosController";

/**
 * The `AstroloutreImagesRoutes` class handles routing for the Astroloutre Images API endpoints.
 * It extends the `Routes` class and sets up the routes used to manage Astroloutre images data.
 */

export class BadgesInfosRoutes extends Routes {
    public router: Router;
    private readonly controller = new BadgesInfosController();

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    private readonly RoutesList: Routes[] = [
        {
            alias: "otr-badges-infos-getAll",
            route: "/badges/infos",
            method: "GET",
            parameters: "",
            comment: "GET /api/badges/infos/",
            description: ""
        },
    ]

    private initializeRoutes() {
        // GET /astroloutre/badges/infos/
        this.router.get("/", Routes.safeHandler(
            this.controller.getAll.bind(this.controller),
            "Une erreur est survenue lors de la récupération des informations des badges dans l'API."
        ));

    }
}