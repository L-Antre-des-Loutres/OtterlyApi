import { Router } from "express";
import { ControllerServeur } from "../controllers/controller-serveur";
import { MiddlewareAuth } from "../middlewares/middleware-auth";

const router = Router();
const controller = new ControllerServeur();
const middlewareAuth = new MiddlewareAuth();

// GET /api/serveurs (affichage de tous les serveurs)
router.get("/", (req, res) => controller.getServeurs(req, res));

// GET /api/serveurs/infos/:id (affichage d'un serveur par son ID)
router.get("/infos/:id", (req, res) => controller.getById(req, res));

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

// POST /api/serveurs/installation/
router.post("/installation/", middlewareAuth.handle.bind(middlewareAuth), async (req, res) => {
    try {
        await controller.install(req, res);
    } catch (err) {
        console.error("Erreur lors de l'installation du serveur :", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
