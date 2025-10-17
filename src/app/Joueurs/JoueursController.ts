import {Request, Response} from "express";
import {Controller} from "../../otterly/abstractClass/controllers/Controller";
import {JoueursModel} from "./JoueursModel";

/**
 * Controller responsible for handling requests related to the "joueurs" resource.
 * Extends the base Controller functionality and interacts with the JoueursModel
 * to retrieve and manipulate player data.
 */

export class JoueursController extends Controller {
    constructor(
        private readonly model: JoueursModel = new JoueursModel({})
    ) {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /joueurs/
    async getAll(req: Request, res: Response) {
        try {
            const joueurs = await this.model.getAll();
            this.sendSuccess(res, joueurs);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // POST /joueurs/link-account/
    async linkAccount(req: Request, res: Response): Promise<void> {
        try {
            const {utilisateur_id, code} = req.body;

            if (!utilisateur_id || !code) {
                this.sendError(res, "L'ID utilisateur et le code sont requis", 400);
                return;
            }

            const joueur_id = await this.model.checkCode(code)

            if (!joueur_id) {
                this.sendNotFound(res, "Code invalide ou utilisé", 400);
                return;
            }

            try {
                await this.model.linkDiscordAccount(joueur_id, utilisateur_id);
            } catch (error) {
                this.sendError(res, "Erreur lors de la liaison du compte Discord", 500);
                return;
            }

            try {
                await this.model.usedCode(code);
            } catch (error) {
                this.sendError(res, "Erreur lors de la mise à jour du code", 500);
                return;
            }

            this.sendSuccess(res, `L'utilisateur avec l'id utilisateur ${utilisateur_id} a lié le compte joueur avec l'id ${joueur_id}`, 200)
        } catch (error) {
            this.handleError(res, error);
        }
    }
}