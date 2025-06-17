// src/middlewares/middleware-auth.ts

import { NextFunction, Request, Response } from "express";
import { Middleware } from "./Middleware";
import { ServiceToken } from "../services/service-token";

/**
 * MiddlewareAuth handles authentication of incoming requests.
 *
 * This class extends the Middleware base class and is responsible for verifying
 * the authentication of API requests by checking and validating the authorization token
 * provided in the request headers.
 *
 * Key responsibilities:
 * - Extracts the authorization token from the request headers.
 * - Validates the token using the `ServiceToken.verifyToken` method.
 * - Retrieves user information associated with the token using `ServiceToken.getUtilisateurByToken`.
 * - Logs successful authentication attempts.
 * - Logs connection attempts.
 * - Passes control to the next middleware or route handler if authentication is successful.
 * - Returns appropriate responses (e.g., 401 Unauthorized or 500 Internal Server Error)
 *   in case of failed authentication or unexpected errors.
 */

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

                // Enregistrement d'une log de connexion
                // TODO: Log de connexion

                // Si tout est bon, on continue
                next();

            } catch (error) {
                console.error("Erreur lors de la vérification du token :", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        })();
    }
}
