import {Router} from "express";
import {UtilisateursDiscordController} from "./UtilisateursDiscordController";
import {Routes} from "../../../otterly/abstractClass/routes/Routes";
import {MiddlewareAuth} from "../../../otterly/Token/TokenMiddleware";

/**
 * Class representing the routes for managing Discord users.
 * Extends the base Routes class to define specific API routes for Discord users-related functionalities.
 */
export class UtilisateursDiscordRoutes extends Routes {
    public router: Router;
    private readonly controller = new UtilisateursDiscordController();
    private readonly middlewareAuth = new MiddlewareAuth();

    /**
     * Liste de toutes les routes disponibles pour les utilisateurs Discord
     */
    private readonly RoutesList: Routes[] = [
        {
            id: 300,
            alias: "otr-utilisateursDiscord-getAll",
            route: "/utilisateurs_discord",
            method: "GET",
            parameters: "",
            comment: "GET /api/utilisateurs_discord/",
            description: "Récupère tous les utilisateurs Discord."
        },
        {
            id: 301,
            alias: "otr-utilisateursDiscord-getById",
            route: "/utilisateurs_discord/:id",
            method: "GET",
            parameters: "id (number)",
            comment: "GET /api/utilisateurs_discord/:id",
            description: "Récupère un utilisateur Discord par son ID."
        },
        {
            id: 302,
            alias: "otr-utilisateursDiscord-create",
            route: "/utilisateurs_discord",
            method: "POST",
            parameters: "body (object)",
            comment: "POST /api/utilisateurs_discord/",
            description: "Crée un nouvel utilisateur Discord."
        },
        {
            id: 303,
            alias: "otr-utilisateursDiscord-update",
            route: "/utilisateurs_discord/:id",
            method: "PUT",
            parameters: "id (number), body (object)",
            comment: "PUT /api/utilisateurs_discord/:id",
            description: "Met à jour un utilisateur Discord existant."
        },
        {
            id: 304,
            alias: "otr-utilisateursDiscord-updateVocalTime",
            route: "/utilisateurs_discord/vocal",
            method: "PUT",
            parameters: "id (number), vocal_time (number)",
            comment: "PUT /api/utilisateurs_discord/vocal_time/",
            description: "Met à jour le temps vocal d’un utilisateur Discord."
        },
        {
            id: 305,
            alias: "otr-utilisateursDiscord-updateNbMessage",
            route: "/utilisateurs_discord/nb_message",
            method: "PUT",
            parameters: "id (number), nb_message (number)",
            comment: "PUT /api/utilisateurs_discord/nb_message/",
            description: "Met à jour le nombre de messages envoyés par un utilisateur Discord."
        },
        {
            id: 306,
            alias: "otr-utilisateursDiscord-updateActivity",
            route: "/utilisateurs_discord/activity",
            method: "PUT",
            parameters: "id (number)",
            comment: "PUT /api/utilisateurs_discord/activity/",
            description: "Met à jour la dernière activité d’un utilisateur Discord."
        }
    ];

    constructor() {
        super("", "", "", "");
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    /**
     * Initialise les routes Express et les relie au contrôleur
     */
    private initializeRoutes() {
        // GET /utilisateurs_discord/
        this.router.get("/", Routes.safeHandler(
            this.controller.getAll.bind(this.controller),
            "Une erreur est survenue lors de la récupération de tous les utilisateurs Discord."
        ));

        // GET /utilisateurs_discord/:id
        this.router.get("/:id", Routes.safeHandler(
            this.controller.getById.bind(this.controller),
            "Une erreur est survenue lors de la récupération d’un utilisateur Discord par son ID."
        ));

        // GET /utilisateurs_discord/by_discord_id/:discord_id
        this.router.get("/utilisateurs_discord/by_discord_id/:discord_id",
            Routes.safeHandler(this.controller.getByDiscordId.bind(this.controller),
                "Une erreur est survenue lors de la récupération d’un utilisateur Discord par son Id Discord."))

        // POST /utilisateurs_discord/
        this.router.post("/", this.middlewareAuth.handle.bind(this.middlewareAuth),
            Routes.safeHandler(this.controller.create.bind(this.controller),
            "Une erreur est survenue lors de la création d’un utilisateur Discord."
        ));

        // PUT /utilisateurs_discord/:id
        this.router.put("/", this.middlewareAuth.handle.bind(this.middlewareAuth),
            Routes.safeHandler(this.controller.update.bind(this.controller),
            "Une erreur est survenue lors de la mise à jour d’un utilisateur Discord."
        ));

        // PUT /utilisateurs_discord/vocal/
        this.router.put("/vocal_time", this.middlewareAuth.handle.bind(this.middlewareAuth),
            Routes.safeHandler(this.controller.updateVocalTime.bind(this.controller),
            "Une erreur est survenue lors de la mise à jour du temps vocal d’un utilisateur Discord."
        ));

        // PUT /utilisateurs_discord/nb_message/
        this.router.put("/nb_message", this.middlewareAuth.handle.bind(this.middlewareAuth),
            Routes.safeHandler(this.controller.updateNbMessage.bind(this.controller),
            "Une erreur est survenue lors de la mise à jour du nombre de messages d’un utilisateur Discord."
        ));

        // PUT /utilisateurs_discord/activity/
        this.router.put("/activity", this.middlewareAuth.handle.bind(this.middlewareAuth),
            Routes.safeHandler(this.controller.updateActivity.bind(this.controller),
            "Une erreur est survenue lors de la mise à jour de l’activité d’un utilisateur Discord."
        ));
    }
}
