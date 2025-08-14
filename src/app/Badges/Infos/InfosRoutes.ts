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
        {
            alias: "otr-badges-infos-getById",
            route: "/badges/infos/:id",
            method: "GET",
            parameters: "id",
            comment: "GET /api/badges/infos/:id",
        },
        {
            alias: "otr-badges-infos-getByCategorieId",
            route: "/badges/infos/categories/:id",
            method: "GET",
            parameters: "id",
            comment: "GET /api/badges/infos/categories/:id",
        },
    ]

    private initializeRoutes() {
        // GET /badges/infos/
        this.router.get("/", Routes.safeHandler(
            this.controller.getAll.bind(this.controller),
            "Une erreur est survenue lors de la récupération des informations des badges dans l'API."
        ));

        // /badges/infos/:id
        this.router.get("/:id", Routes.safeHandler(
            (req, res) => this.controller.getById(req, res),
            "Erreur lors de la récupération des infos par ID."
        ));

        // /badges/infos/categories/:id
        this.router.get("/categories/:categorie_id", Routes.safeHandler(
            (req, res) => this.controller.getByCategorieId(req, res),
            "Erreur lors de la récupération des badges par catégorie."
        ));

    }
}