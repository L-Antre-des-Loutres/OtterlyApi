// src/routes/route-astroloutre_image.ts

import {Routes} from "./Routes";
import {Router} from "express";
import {ApiRoutesController} from "../controllers/controller-api_routes";
import {ControllerAstroLoutreImage} from "../controllers/controller-astroloutre_image";

/**
 * TODO
 */

export class RouteAstroLoutreImage extends Routes{
    public router: Router;
    private readonly controller = new ControllerAstroLoutreImage();

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }
    private readonly RoutesList: Routes[] = [
        {
            id: 100 ,
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
        this.router.get("/", async (req, res) => {
            try {
                const routes = await this.controller.getAll(req, res);
                res.status(200).json(routes);
            } catch (error) {
                res.status(500).json({
                    error: "Une erreur est survenue lors de la recherche des routes.",
                });
            }
        });

        // GET /astroloutre/images/:jeu
        this.router.get("/:jeu", async (req, res) => {
            try {
                const routes = await this.controller.getByGame(req, res);
            } catch (error) {
                res.status(500).json({
                    error: "Une erreur est survenue lors de la recherche des routes.",
                });
            }
        })
    }

}