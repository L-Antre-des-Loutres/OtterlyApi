import { Router } from "express";
import { ControllerServeur } from "../controllers/controller-serveur";
import { MiddlewareAuth } from "../middlewares/middleware-auth";
import { ModelServeur } from "../models/model-serveur";

const router = Router();
const controller = new ControllerServeur();
const middlewareAuth = new MiddlewareAuth();

// GET /api/serveurs (affichage de tous les serveurs)
router.get("/", (req, res) => controller.getServeurs(req, res));

// POST /api/serveurs (création d'un serveur) (token d'authentification requis)
router.post("/", middlewareAuth.handle.bind(middlewareAuth), async (req, res) => {
    try {
        const serveur = await ModelServeur.create(req.body);
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
        const serveur = await ModelServeur.delete(req.body.id);
        res.status(200).json({
            success: true,
            data: serveur,
        });
    } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
