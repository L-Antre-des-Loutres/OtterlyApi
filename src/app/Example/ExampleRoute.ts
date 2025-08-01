import { Router} from "express";
import { Routes } from "../../otterly/abstractClass/routes/Routes";
import {ExampleController} from "./ExampleController";

/**
 * RouteUtilisateursDiscord configure les routes liées aux utilisateurs Discord.
 * Elle étend la classe de base Routes du framework Otterly.
 */
export class ExampleRoute extends Routes {
    public router: Router;
    private readonly controller: ExampleController;

    private readonly RoutesList: Routes[] = [
        {
            id: 300,
            alias: "otr-utilisateursDiscord-getAll",
            route: "/utilisateurs_discord",
            method: "GET",
            parameters: "",
            comment: "GET /api/utilisateurs_discord/",
            description: "Obtenir toutes les images astroloutre"
        },
    ];

    constructor(controller: ExampleController = new ExampleController()) {
        super("", "", "", "");
        this.router = Router();
        this.controller = controller;

        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    /**
     * Méthode d'initialisation des routes HTTP
     */
    private initializeRoutes(): void {

        // GET: routes/
        this.router.get("/", Routes.safeHandler(
            this.controller.getAll.bind(this.controller),
            "Une erreur est survenue lors de la récupération des utilisateurs Discord."
        ));
    }
}
