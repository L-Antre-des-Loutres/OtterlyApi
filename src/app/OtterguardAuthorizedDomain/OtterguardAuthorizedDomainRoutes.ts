import {Router} from "express";
import {Routes} from "../../otterly/abstractClass/routes/Routes";
import {OtterguardAuthorizedDomainController} from "./OtterguardAuthorizedDomainController";

/**
 * OtterguardAuthorizedDomainRoutes is responsible for defining and registering routes related to "otterguard_authorized_domain".
 * It extends the base Routes class and initializes specific routes and their corresponding logic.
 */
export class OtterguardAuthorizedDomainRoutes extends Routes {
    public router: Router;
    private readonly controller = new OtterguardAuthorizedDomainController();
    private readonly RoutesList: Routes[] = [
        {
            id: 6000,
            alias: "otr-otterguard-getAll",
            route: "/otterguard/authorized-domain",
            method: "GET",
            parameters: "",
            comment: "GET /api/otterguard/authorized-domain",
            description: "Récupère tous les domaines autorisés."
        },
        {
            id: 6001,
            alias: "otr-otterguard-getById",
            route: "/otterguard/authorized-domain/:id",
            method: "GET",
            parameters: "id",
            comment: "GET /api/otterguard/authorized-domain/:id",
            description: "Récupère un domaine autorisé par son ID."
        },
        {
            id: 6002,
            alias: "otr-otterguard-create",
            route: "/otterguard/authorized-domain",
            method: "POST",
            parameters: "domain_url",
            comment: "POST /api/otterguard/authorized-domain",
            description: "Crée un nouveau domaine autorisé."
        },
        {
            id: 6003,
            alias: "otr-otterguard-update",
            route: "/otterguard/authorized-domain/:id",
            method: "PUT",
            parameters: "id, domain_url",
            comment: "PUT /api/otterguard/authorized-domain/:id",
            description: "Met à jour un domaine autorisé."
        },
        {
            id: 6004,
            alias: "otr-otterguard-delete",
            route: "/otterguard/authorized-domain/:id",
            method: "DELETE",
            parameters: "id",
            comment: "DELETE /api/otterguard/authorized-domain/:id",
            description: "Supprime un domaine autorisé."
        }
    ]

    constructor() {
        super("", "", "", "")
        this.router = Router();
        Routes.registerRoutes(this.RoutesList, "");
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // GET /otterguard/authorized-domain
        this.router.get("/", Routes.safeHandler(
            (req, res) => this.controller.getAll(req, res),
            "Erreur lors de la récupération des domaines."
        ));

        // GET /otterguard/authorized-domain/:id
        this.router.get("/:id", Routes.safeHandler(
            (req, res) => this.controller.getById(req, res),
            "Erreur lors de la récupération du domaine."
        ));

        // POST /otterguard/authorized-domain
        this.router.post("/", Routes.safeHandler(
            (req, res) => this.controller.create(req, res),
            "Erreur lors de la création du domaine."
        ));

        // PUT /otterguard/authorized-domain/:id
        this.router.put("/:id", Routes.safeHandler(
            (req, res) => this.controller.update(req, res),
            "Erreur lors de la mise à jour du domaine."
        ));

        // DELETE /otterguard/authorized-domain/:id
        this.router.delete("/:id", Routes.safeHandler(
            (req, res) => this.controller.delete(req, res),
            "Erreur lors de la suppression du domaine."
        ));
    }
}
