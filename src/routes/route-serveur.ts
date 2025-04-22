import { Router } from "express";
import { ControllerServeur } from "../controllers/controller-serveur";

const router = Router();
const controller = new ControllerServeur();

// Associer chaque méthode HTTP à la méthode du contrôleur correspondante
router.get("/", (req, res) => controller.getServeurs(req, res));

export default router;
