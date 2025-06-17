// src/controllers/Controller.ts

import { Request, Response } from "express";

/**
 * The `Controller` class is an abstract base class designed to handle HTTP responses for a server application.
 * It provides utility methods for sending different types of HTTP responses, such as success, not found, and error responses.
 * It also includes an abstract method `handleRequest` that must be implemented by any subclass to define specific route handling logic.
 *
 * This class is intended to be extended by other controllers to provide consistent response handling across the application.
 * - `sendSuccess` sends a success response with the provided data and status code.
 * - `sendNotFound` sends a not found response with the provided message and status code.
 * - `sendError` sends an error response with the provided error message and status code.
 * - `handleRequest` is an abstract method that must be implemented by any subclass to define specific route handling logic.
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
