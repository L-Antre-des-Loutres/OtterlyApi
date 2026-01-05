import {Request, Response} from "express";
import {Controller} from "../../otterly/abstractClass/controllers/Controller";
import {OtterguardAuthorizedDomainModel} from "./OtterguardAuthorizedDomainModel";

/**
 * Controller responsible for handling requests related to the "otterguard_authorized_domain" resource.
 * Extends the base Controller functionality and interacts with the OtterguardAuthorizedDomainModel
 * to retrieve and manipulate authorized domain data.
 */
export class OtterguardAuthorizedDomainController extends Controller {
    constructor(
        private readonly model: OtterguardAuthorizedDomainModel = new OtterguardAuthorizedDomainModel({})
    ) {
        super();
    }

    handleRequest(req: Request, res: Response): void {
        const {method, url} = req;
        console.log(`Handling request: ${method} ${url}`);
        res.status(200).send("Request handled successfully.");
    }

    // GET /otterguard/authorized-domain
    async getAll(req: Request, res: Response) {
        try {
            const domains = await this.model.getAll();
            this.sendSuccess(res, domains);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // GET /otterguard/authorized-domain/:id
    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                this.sendError(res, "ID invalide", 400);
                return;
            }
            const domain = await this.model.getById(id);
            if (domain) {
                this.sendSuccess(res, domain);
            } else {
                this.sendNotFound(res, "Domaine non trouvé");
            }
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // POST /otterguard/authorized-domain
    async create(req: Request, res: Response) {
        try {
            const {domain_url} = req.body;
            if (!domain_url) {
                this.sendError(res, "Le champ domain_url est requis", 400);
                return;
            }
            await this.model.create(domain_url);
            this.sendSuccess(res, "Domaine créé avec succès", 201);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // PUT /otterguard/authorized-domain/:id
    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const {domain_url} = req.body;
            if (isNaN(id)) {
                this.sendError(res, "ID invalide", 400);
                return;
            }
            if (!domain_url) {
                this.sendError(res, "Le champ domain_url est requis", 400);
                return;
            }
            await this.model.update(id, domain_url);
            this.sendSuccess(res, "Domaine mis à jour avec succès");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // DELETE /otterguard/authorized-domain/:id
    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                this.sendError(res, "ID invalide", 400);
                return;
            }
            await this.model.delete(id);
            this.sendSuccess(res, "Domaine supprimé avec succès");
        } catch (error) {
            this.handleError(res, error);
        }
    }
}
