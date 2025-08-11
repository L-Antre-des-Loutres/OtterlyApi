
import {Router} from "express";
import {Routes} from "../../../otterly/abstractClass/routes/Routes";
import {ConnexionController} from "./ConnexionController";

/**
 * Class representing the ConnexionRoutes for handling authentication and user data routes.
 * Extends the Routes class.
 */

export class ConnexionRoutes extends Routes {
    public router: Router;
    private readonly controller = new ConnexionController();

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RouteDiscord, "");
        this.initializeRoutes();
    }

    private readonly RouteDiscord: Routes[] = [
        {
            alias: "otr-discord-login",
            route: "/auth/discord/login",
            method: "GET",
            parameters: "",
            comment: "GET /api/auth/discord/login",
            description: "Redirige vers Discord OAuth2"
        },
        {
            alias: "otr-discord-callback",
            route: "/auth/discord/callback",
            method: "GET",
            parameters: ""
        },
    ]

    private initializeRoutes() {
        this.router.get("/login", Routes.safeHandler(
            (req, res) => this.controller.discordLogin(req, res),
            "Une erreur est survenue lors de la route de connexion discord."
        ));

        this.router.get("/callback", Routes.safeHandler(
            (req, res) => this.controller.discordCallback(req, res),
            "Une erreur est survenue lors de la route de callback discord."
        ));

        this.router.get("/me", Routes.safeHandler(
            (req, res) => this.controller.discordMe(req, res),
            "Une erreur est survenue lors de la route de me discord."
        ));
    }

}