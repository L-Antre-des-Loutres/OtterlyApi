import {Request, Response} from "express";
import {Controller} from "../../../otterly/abstractClass/controllers/Controller";
import {JoueursStatsModel} from "./JoueursStatsModel";

/**
 * JoueursStatsController handles requests for joueur statistics and delegates
 * data retrieval to the JoueursStatsModel. It processes incoming HTTP requests
 * and provides responses for various statistics-related endpoints.
 *
 * Extends:
 *   Controller
 *
 * Constructor:
 *   Initializes the controller with an instance of JoueursStatsModel,
 *   responsible for managing statistics data retrieval.
 */

export class JoueursStatsController extends Controller {
    constructor(
        private readonly model: JoueursStatsModel = new JoueursStatsModel({})
    ) {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /joueurs/stats-serveur/
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const stats = await this.model.getAll();
            this.sendSuccess(res, stats);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /joueurs/stats-serveur/minimum/
    async getAllMinStats(req: Request, res: Response): Promise<void> {
        try {
            const stats = await this.model.getAllMinStats();
            this.sendSuccess(res, stats);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /joueurs/stats-serveur/serveurs-total-hours/
    async getTotalServeurHours(req: Request, res: Response): Promise<void>{
        try {
            const totalServeurHours = await this.model.getTotalHours()
            this.sendSuccess(res, totalServeurHours)
        } catch (error) {
            this.handleError(res, error)
        }
    }

    // GET /joueurs/stats-serveur/serveurs-total-hours-per-server/
    async getTotalHoursPerServer(req: Request, res: Response): Promise<void> {
        try {
            const totalHoursPerServer = await this.model.getTotalHoursPerServer()
            this.sendSuccess(res, totalHoursPerServer)
        } catch (error) {}
    }

    // GET /joueurs/stats-serveur/per-server-uid/:uid
    async getByUid(req: Request, res: Response): Promise<void> {
        try {
            const stat = await this.model.getStatsByUid(req.params.uid)
            this.sendSuccess(res, stat)
        } catch (error) {
            this.handleError(res, error)
        }
    }

    // GET /joueurs/stats-serveur/total-stats/
    async getTotalStats(req: Request, res: Response): Promise<void> {
        try {
            const stat = await this.model.getTotalStats()
            this.sendSuccess(res, stat)
        } catch (error) {
            this.handleError(res, error)
        }
    }

    // GET /joueurs/stats-serveur/total-stats-only-modded-server/
    async getTotalStatsOnlyModdedServer(req: Request, res: Response): Promise<void> {
        try {
            const stat = await this.model.getTotalStatsOnlyModdedServer()
            this.sendSuccess(res, stat)
        } catch (error) {
            this.handleError(res, error)
        }
    }

    // GET /joueurs/stats-serveur/total-stats-uid/:uid
    async getTotalStatsByUid(req: Request, res: Response): Promise<void> {
        try {
            const stat = await this.model.getTotalStatsByUid(req.params.uid)
            this.sendSuccess(res, stat)
        } catch (error) {
            this.handleError(res, error)
        }
    }

    // GET /joueurs/stats-serveur/stats-by-server/:id
    async getStatsByServer(req: Request, res: Response): Promise<void> {
        try {
            const stat = await this.model.getStatsByServer(req.params.id)
            this.sendSuccess(res, stat)
        } catch (error) {
            this.handleError(res, error)
        }
    }
}