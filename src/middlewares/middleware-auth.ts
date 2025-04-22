// src/middlewares/middleware-auth.ts

import { NextFunction, Request, Response } from "express";
import { Middleware } from "./Middleware";
import { ServiceToken } from "../services/service-token";

export class MiddlewareAuth extends Middleware {
    handle(req: Request, res: Response, next: NextFunction): void {
        (async () => {
            try {
                // Vérification de l'authentification
                const token = req.headers["authorization"];
                if (!token) {
                    return res.status(401).json({ message: "Unauthorized" });
                }

                // Vérification du token de l'utilisateur
                if (!await ServiceToken.verifyToken(token)) {
                    return res.status(401).json({ message: "Unauthorized" });
                }

                // Récupération des informations du token
                const tokenData = await ServiceToken.getUtilisateurByToken(token);

                // Affichage d'une log d'authentification réussie
                console.log("Authentification réussie pour :", tokenData);

                // Si tout est bon, on continue
                next();

            } catch (error) {
                console.error("Erreur lors de la vérification du token :", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        })();
    }
}
