import {Router} from "express";
import {Routes} from "../../../otterly/abstractClass/routes/Routes";
import {AstroloutreBadgesInfosController} from "./InfosController";

/**
 * The `AstroloutreImagesRoutes` class handles routing for the Astroloutre Images API endpoints.
 * It extends the `Routes` class and sets up the routes used to manage Astroloutre images data.
 */

export class AstroloutreBadgesInfosRoutes extends Routes {
    public router: Router;
    private readonly controller = new AstroloutreBadgesInfosController();

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    private readonly RoutesList: Routes[] = [
        {
            alias: "otr-astroloutre-badges-getAll",
            route: "/astroloutre/images",
            method: "GET",
            parameters: "",
            comment: "GET /api/astroloutre/badges/",
            description: "Obtenir toutes les images astroloutre"
        },
    ]

    private initializeRoutes() {
        // GET /astroloutre/badges/
        this.router.get("/", Routes.safeHandler(
            this.controller.getAll.bind(this.controller),
            "Une erreur est survenue lors de la récupération des images dans l'API."
        ));

    }
}