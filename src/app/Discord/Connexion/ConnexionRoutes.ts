
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

        this.router.get("/login", async (req, res) => {
            try {
                await this.controller.discordLogin(req, res);
            } catch (error) {
                res.status(500).json({
                    error: "Une erreur est survenue lors de la recherche des routes.",
                });
            }
        });

        this.router.get("/callback", async (req, res) => {
            try {
                await this.controller.discordCallback(req, res);
            } catch (error) {
                res.status(500).json({
                    error: "Une erreur est survenue lors de la recherche des routes.",
                });
            }
        });

        // Route pour récupérer les infos utilisateur à partir du cookie JWT
        this.router.get('/me', async (req, res) => {
            try {
                await this.controller.discordMe(req, res);
            } catch (error) {
                res.status(500).json({
                    error: "Une erreur est survenue lors de la recherche des routes.",
                });
            }
        });
    }
}