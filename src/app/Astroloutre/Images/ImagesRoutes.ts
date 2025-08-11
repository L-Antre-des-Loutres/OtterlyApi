import {Router} from "express";
import {Routes} from "../../../otterly/abstractClass/routes/Routes";
import {AstroloutreImagesController} from "./ImagesController";

/**
 * The `AstroloutreImagesRoutes` class handles routing for the Astroloutre Images API endpoints.
 * It extends the `Routes` class and sets up the routes used to manage Astroloutre images data.
 */

export class AstroloutreImagesRoutes extends Routes {
    public router: Router;
    private readonly controller = new AstroloutreImagesController();

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    private readonly RoutesList: Routes[] = [
        {
            id: 100,
            alias: "otr-astroloutre-images-getAll",
            route: "/astroloutre/images",
            method: "GET",
            parameters: "",
            comment: "GET /api/astroloutre/images/",
            description: "Obtenir toutes les images astroloutre"
        },
        {
            id: 101,
            alias: "otr-astroloutre-images-getByGame",
            route: "/astroloutre/images/:jeu",
            method: "GET",
            parameters: "",
            comment: "GET /api/astroloutre/images/:jeu",
            description: "Obtenir toutes les images astroloutre d'un jeu"
        }
    ]

    private initializeRoutes() {
        // GET /astroloutre/images/
        this.router.get("/", Routes.safeHandler(
            this.controller.getAll.bind(this.controller),
            "Une erreur est survenue lors de la récupération des images dans l'API."
        ));

        // GET /astroloutre/images/:jeu
        this.router.get("/:jeu", Routes.safeHandler(
            (req, res) => this.controller.getByGame(req, res),
            "Une erreur est survenue lors de la récupération des images par jeu dans l'API."
        ));


    }
}