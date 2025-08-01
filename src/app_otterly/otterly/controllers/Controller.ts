// src/controllers/Controller.ts

import { Request, Response } from "express";

/**
 * Abstract class representing a Controller, designed to handle HTTP responses and implement
 * route-specific behavior through the `handleRequest` method.
 * Includes utility methods to send different types of responses (e.g., success, not found, error).
 *
 * All classes extending this Controller must implement the `handleRequest` method to define specific request handling logic.
 *
 * Methods:
 * - sendSuccess: Sends an HTTP response for successful requests with provided data and status code.
 * - sendNotFound: Sends an HTTP response indicating resource not found with a custom message.
 * - sendError: Sends an HTTP response indicating an error with a custom message and status code.
 * - handleError: Handles server-side errors by logging the error and sending a generic error response.
 * - handleRequest: Abstract method to define specific business logic for incoming requests.
 */

export abstract class Controller {
    
    // Méthode pour envoyer une réponse avec succès
    protected sendSuccess(res: Response, data: any, status: number = 200): void {
        res.status(status).json({
            success: true,
            data: data
        });
    }

    // Méthode pour envoyer une réponse données introuvables
    protected sendNotFound(res: Response, message: string, status: number = 404): void {
        res.status(status).json({
            success: false,
            message: message,
        });
    }

    // Méthode pour envoyer une réponse d'erreur
    protected sendError(res: Response, error: string, status: number = 500): void {
        res.status(status).json({
            success: false,
            message: error,
        });
    }

    // Méthode pour gérer les erreurs génériques
    protected handleError(res: Response, error: any): void {
        console.error("Erreur:", error);
        this.sendError(res, "Erreur interne du serveur");
    }

    // Méthode abstraite pour gérer les actions des routes
    abstract handleRequest(req: Request, res: Response): void;
}
