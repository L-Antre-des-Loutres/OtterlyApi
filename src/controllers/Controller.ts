// src/controllers/controller.ts
import { Request, Response } from "express";

export abstract class Controller {
    
    // Méthode pour envoyer une réponse avec succès
    protected sendSuccess(res: Response, data: any, status: number = 200): void {
        res.status(status).json({
            success: true,
            data: data,
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
