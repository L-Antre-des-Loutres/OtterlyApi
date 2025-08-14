import {Router} from "express";
import {Routes} from "../../../otterly/abstractClass/routes/Routes";
import {BadgesCategoriesController} from "./CategoriesController";

/**
 * Class responsible for defining and managing routes related to badges categories.
 * Inherits from the base Routes class and sets up the routes specific to fetching badge category data.
 */

export class BadgesCategoriesRoutes extends Routes {
    public router: Router;
    private readonly controller : BadgesCategoriesController = new BadgesCategoriesController();

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    private readonly RoutesList: Routes[] = [
        {
            alias: "otr-badges-categories-getAll",
            route: "/badges/categories/",
            method: "GET",
            parameters: "",
            comment: "GET /api/badges/categories/",
            description: ""
        },
    ]

    private initializeRoutes() {
        // GET /badges/categories/
        this.router.get("/", Routes.safeHandler(
            this.controller.getAll.bind(this.controller),
            "Une erreur est survenue lors de la récupération des catégories des badges dans l'API."
        ));

    }
}