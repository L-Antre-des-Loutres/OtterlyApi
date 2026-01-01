import {Router} from "express";
import {UtilisateursDiscordStatsController} from "./UtilisateursDiscordStatsController";
import {Routes} from "../../../../otterly/abstractClass/routes/Routes";
import {MiddlewareAuth} from "../../../../otterly/Token/TokenMiddleware";

/**
 * Class representing the routes for managing Discord user statistics.
 * Extends the base Routes class to define specific API routes.
 */
export class UtilisateursDiscordStatsRoutes extends Routes {
    public router: Router;
    private readonly controller = new UtilisateursDiscordStatsController();
    private readonly middlewareAuth = new MiddlewareAuth();

    /**
     * List of all available routes for Discord user stats
     */
    private readonly RoutesList: Routes[] = [
        {
            id: 2200,
            alias: "otr-utilisateursDiscordStats-getById",
            route: "/utilisateurs_discord/stats/:id",
            method: "GET",
            parameters: "id (number)",
            comment: "GET /api/utilisateurs_discord/stats/:id",
            description: "Gets Discord user stats by User ID."
        },
        {
            id: 2201,
            alias: "otr-utilisateursDiscordStats-getAll",
            route: "/utilisateurs_discord/stats",
            method: "GET",
            parameters: "",
            comment: "GET /api/utilisateurs_discord/stats",
            description: "Gets all Discord user stats."
        },
        {
            id: 2202,
            alias: "otr-utilisateursDiscordStats-update",
            route: "/utilisateurs_discord/stats",
            method: "PUT",
            parameters: "id (number), body (object)",
            comment: "PUT /api/utilisateurs_discord/stats",
        },
        {
            id: 2205,
            alias: "otr-utilisateursDiscordStats-create",
            route: "/utilisateurs_discord/stats",
            method: "POST",
            parameters: "body (object)",
            comment: "POST /api/utilisateurs_discord/stats",
            description: "Creates stats for a Discord user."
        }
    ];

    constructor() {
        super("", "", "", "");
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    /**
     * Initializes Express routes and binds them to the controller
     */
    private initializeRoutes() {
        // GET /utilisateurs_discord/stats/:id
        this.router.get("/:id", Routes.safeHandler(
            this.controller.getById.bind(this.controller),
            "Error retrieving Discord user stats by ID."
        ));

        // GET /utilisateurs_discord/stats
        this.router.get("/", Routes.safeHandler(
            this.controller.getAll.bind(this.controller),
            "Error retrieving all Discord user stats."
        ));

        // PUT /utilisateurs_discord/stats
        this.router.put("/", this.middlewareAuth.handle.bind(this.middlewareAuth),
            Routes.safeHandler(this.controller.update.bind(this.controller),
                "Error updating Discord user stats."
            ));

        // POST /utilisateurs_discord/stats
        this.router.post("/", this.middlewareAuth.handle.bind(this.middlewareAuth),
            Routes.safeHandler(this.controller.create.bind(this.controller),
                "Error creating Discord user stats."
            ));
    }
}
