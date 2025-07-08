// src/routes/route-serveur.ts

import { Router } from "express";
import { ControllerServeur } from "../controllers/controller-serveur";
import { MiddlewareAuth } from "../middlewares/middleware-auth";
import { Routes } from "./Routes";

/**
 * Represents an instance of a router, typically used to define and handle
 * application routes in a structured manner. The router instance can be used
 * to register middleware, define route-specific logic, and map HTTP methods to
 * corresponding handlers.
 *
 * This variable provides access to a modular routing system, allowing you to
 * group and manage routes efficiently within an application. It is commonly
 * employed in server frameworks to manage incoming requests and their
 * respective responses.
 */

const router = Router();
const controller = new ControllerServeur();
const middlewareAuth = new MiddlewareAuth();

const RoutesList: Routes[] = [
    {
        id: 1 ,alias: "otr-serveurs", route: "/", method: "GET", parameters: "", description: "Affichage de tous les serveurs", comment: "GET /api/serveurs"
    },
    {
        id: 2 ,alias: "otr-serveurs-infos", route: "/infos/:id", method: "GET", parameters: "id", description: "Affichage d'un serveur par son ID", comment: "GET /api/serveurs/infos/:id"
    },
    {
        id: 3 ,alias: "otr-serveurs-actif-global", route: "/actif-global", method: "GET", parameters: "", description: "Affichage des serveurs actifs et global", comment: "GET /api/serveurs/actif-global"
    },
    {
        id: 4 ,alias: "otr-serveurs-actif-global-jeu", route: "/actif-global/:jeu", method: "GET", parameters: "jeu", description: "Affichage des serveurs actifs et global par le jeu", comment: "GET /api/serveurs/actif-global/:jeu"
    },
    {
        id: 5 ,alias: "otr-serveurs-primaire-secondaire", route: "/primaire-secondaire", method: "GET", parameters: "", description: "Affichage des serveurs primaire et secondaire", comment: "GET /api/serveurs/primaire-secondaire"
    },
    {
        id: 6 ,alias: "otr-serveurs-creer", route: "/", method: "POST", parameters: "nom jeu version modpack modpack_url nom_monde embed_color path_serv start_script actif global",description: "Création d'un serveur", comment: "POST /api/serveurs Nécessite un token d'authentification"
    },
    {
        id: 7 ,alias: "otr-serveurs-supprimer", route: "/", method: "DELETE", parameters: "id", description: "Suppression d'un serveur", comment: "DELETE /api/serveurs Nécessite un token d'authentification"
    },
    {
        id: 8 ,alias: "otr-serveurs-start", route: "/start/", method: "POST", parameters: "id", description: "Lancement du serveur", comment: "POST /api/serveurs/start/ Nécessite un token d'authentification"
    },
    {
        id: 9 ,alias: "otr-serveurs-stop", route: "/stop/", method: "POST", parameters: "id", description: "Arrêt du serveur", comment: "POST /api/serveurs/stop/ Nécessite un token d'authentification"
    },
];

// Enregistrement des routes
Routes.registerRoutes(RoutesList, "serveurs");

// GET /api/serveurs (affichage de tous les serveurs)
router.get("/", (req, res) => controller.getServeurs(req, res));

// GET /api/serveurs/infos/:id (affichage d'un serveur par son ID)
router.get("/infos/:id", (req, res) => controller.getById(req, res))

// GET /api/serveurs/actif-global (affichage des serveurs actif et global)
router.get("/actif-global", (req, res) => controller.getServeursActifEtGlobal(req, res));

// GET /api/serveurs/actif-global/:jeu (affichage des serveurs actif et global par le jeu)
router.get("/actif-global/:jeu", (req, res) => controller.getServeursActifEtGlobalByGame(req, res));

// GET /api/serveurs/primaire-secondaire (affichage des serveurs primaire et secondaire)
router.get("/primaire-secondaire", (req, res) => controller.getServeursPrimaireSecondaire(req, res));

// POST /api/serveurs (création d'un serveur) (token d'authentification requis)
router.post("/", middlewareAuth.handle.bind(middlewareAuth), async (req, res) => {
    try {
        const serveur = await controller.create(req, res);
        res.status(201).json({
            success: true,
            data: serveur,
        });
    } catch (err) {
        console.error("Erreur lors de la création :", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// DELETE /api/serveurs (suppression d'un serveur) (token d'authentification requis)
router.delete("/", middlewareAuth.handle.bind(middlewareAuth), async (req, res) => {
    try {
        const serveur = await controller.delete(req, res);
        res.status(200).json({
            success: true,
            data: serveur,
        });
    } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// ---------------- MÉTHODES GESTION DU LANCEMENT / ARRET DU SERVEUR ------------------

// POST /api/serveurs/start/
router.post("/start/", middlewareAuth.handle.bind(middlewareAuth), async (req, res) => {
    try {
        await controller.start(req, res);
    } catch (err) {
        console.error("Erreur lors du lancement du serveur :", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// POST /api/serveurs/stop/
router.post("/stop/", middlewareAuth.handle.bind(middlewareAuth), async (req, res) => {
    try {
        await controller.stop(req, res);
    } catch (err) {
        console.error("Erreur lors de l'arrêt du serveur :", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
