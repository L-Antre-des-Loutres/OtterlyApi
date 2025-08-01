import { Router } from "express";
import {ApiRoutesController} from "../controllers/ApiRoutesController";
import {Routes} from "./Routes";

/**
 * Route pour obtenir toutes les routes de l'API
 * @author matheo-1712
 */

export class ApiRoute {
    public router: Router;
    private readonly controller = new ApiRoutesController();

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/", Routes.safeHandler(
            this.controller.getAll.bind(this.controller),
            "Une erreur est survenue lors de la récupération des routes de l'API."
        ));
    }
}