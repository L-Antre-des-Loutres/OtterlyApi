import { Router } from "express";
import { MiddlewareAuth } from "../../otterly/Token/TokenMiddleware";
import { Routes } from "../../otterly/abstractClass/routes/Routes";
import { ServeurController } from "./ServeurController";

/**
 *
 */

export class ServeurRoutes {
    public readonly router: Router;
    private readonly controller: ServeurController;
    private readonly middlewareAuth: MiddlewareAuth;

    constructor() {
        this.router = Router();
        this.controller = new ServeurController();
        this.middlewareAuth = new MiddlewareAuth();

        this.registerDocumentation();
        this.registerRoutes();
    }

    private registerDocumentation() {
        const RoutesList: Routes[] = [
            { id: 1, alias: "otr-serveurs", route: "/", method: "GET", parameters: "", description: "Affichage de tous les serveurs", comment: "GET /api/serveurs" },
            { id: 2, alias: "otr-serveurs-infos", route: "/infos/:id", method: "GET", parameters: "id", description: "Affichage d'un serveur par son ID", comment: "GET /api/serveurs/infos/:id" },
            { id: 3, alias: "otr-serveurs-actif-global", route: "/actif-global", method: "GET", parameters: "", description: "Affichage des serveurs actifs et global", comment: "GET /api/serveurs/actif-global" },
            { id: 4, alias: "otr-serveurs-actif-global-jeu", route: "/actif-global/:jeu", method: "GET", parameters: "jeu", description: "Affichage des serveurs actifs et global par le jeu", comment: "GET /api/serveurs/actif-global/:jeu" },
            { id: 5, alias: "otr-serveurs-primaire-secondaire", route: "/primaire-secondaire", method: "GET", parameters: "", description: "Affichage des serveurs primaire et secondaire", comment: "GET /api/serveurs/primaire-secondaire" },
            { id: 6, alias: "otr-serveurs-creer", route: "/", method: "POST", parameters: "nom jeu version modpack modpack_url nom_monde embed_color path_serv start_script actif global", description: "Création d'un serveur", comment: "POST /api/serveurs Nécessite un token d'authentification" },
            { id: 7, alias: "otr-serveurs-supprimer", route: "/", method: "DELETE", parameters: "id", description: "Suppression d'un serveur", comment: "DELETE /api/serveurs Nécessite un token d'authentification" },
            { id: 8, alias: "otr-serveurs-start", route: "/start/", method: "POST", parameters: "id", description: "Lancement du serveur", comment: "POST /api/serveurs/start/ Nécessite un token d'authentification" },
        ];

        Routes.registerRoutes(RoutesList, "serveurs");
    }

    private registerRoutes() {
        this.router.get("/", (req, res) => this.controller.getServeurs(req, res));

        this.router.get("/infos/:id", (req, res) => this.controller.getById(req, res));

        this.router.get("/actif-global", (req, res) => this.controller.getServeursActifEtGlobal(req, res));

        this.router.get("/actif-global/:jeu", (req, res) => this.controller.getServeursActifEtGlobalByGame(req, res));

        this.router.get("/primaire-secondaire", (req, res) => this.controller.getServeursPrimaireSecondaire(req, res));

        this.router.post("/", this.middlewareAuth.handle.bind(this.middlewareAuth), async (req, res) => {
            try {
                const serveur = await this.controller.create(req, res);
                res.status(201).json({ success: true, data: serveur });
            } catch (err) {
                console.error("Erreur lors de la création :", err);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });

        this.router.delete("/", this.middlewareAuth.handle.bind(this.middlewareAuth), async (req, res) => {
            try {
                const serveur = await this.controller.delete(req, res);
                res.status(200).json({ success: true, data: serveur });
            } catch (err) {
                console.error("Erreur lors de la suppression :", err);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });

        this.router.post("/start/", this.middlewareAuth.handle.bind(this.middlewareAuth), async (req, res) => {
            try {
                await this.controller.start(req, res);
            } catch (err) {
                console.error("Erreur lors du lancement du serveur :", err);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
}
