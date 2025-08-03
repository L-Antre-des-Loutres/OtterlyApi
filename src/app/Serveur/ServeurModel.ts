import {ServeurInterface} from "./ServeurInterface";
import {Model} from "../../otterly/abstractClass/models/Model";
import {ServeurRepository} from "./ServeurRepository";
import {ServeurParametersRepository} from "./ServeurParameters/ServeurParametersRepository";
import {ServeurService} from "./ServeurService";
import {ServeurParametersInterface} from "./ServeurParameters/ServeurParametersInterface";

/**
 * Represents a model for a server, providing properties and methods to manage server data.
 * Extends the base `Model` class and implements `ServeurInterface`.
 */

export class ServeurModel extends Model implements ServeurInterface {

    nom: string;
    jeu: string;
    version: string;
    modpack: string;
    modpack_url: string;
    nom_monde: string;
    embed_color: string;
    contenaire: string;
    description: string;
    actif: boolean;
    global: boolean;
    players_online?: number;
    type: string;
    image: string

    // Constructeur de la classe Serveur
    constructor(data: Partial<ServeurInterface>) {
        super(data);
        this.nom = data.nom ?? "";
        this.jeu = data.jeu ?? "";
        this.version = data.version ?? "";
        this.modpack = data.modpack ?? "";
        this.modpack_url = data.modpack_url ?? "";
        this.nom_monde = data.nom_monde ?? "";
        this.embed_color = data.embed_color ?? "#000000";
        this.contenaire = data.contenaire ?? "";
        this.description = data.description ?? "";
        this.actif = data.actif ?? false;
        this.global = data.global ?? false;
        this.type = data.type ?? "";
        this.image = data.image ?? "";
    }

    // Initialisation du repository Serveur
    private static readonly serveursRepository = new ServeurRepository();

    // Initialisation du repository Serveur Parameters
    private static readonly serveursParametersRepository = new ServeurParametersRepository();

    // Initialisation du service Serveur
    private static readonly serveursService = new ServeurService();

    // Méthode qui permet de convertir le model en JSON
    toJSON(): Partial<ServeurInterface> {
        return {
            id: this.id,
            nom: this.nom,
            jeu: this.jeu,
            version: this.version,
            modpack: this.modpack,
            modpack_url: this.modpack_url,
            nom_monde: this.nom_monde,
            embed_color: this.embed_color,
            contenaire: this.contenaire,
            description: this.description,
            actif: this.actif,
            global: this.global,
            type: this.type,
            image: this.image,
        };
    }

    // Méthode de récupération de l'ensemble des serveurs
    static async getAll(): Promise<ServeurModel[]> {
        const serveurs = await ServeurModel.serveursRepository.findAll();
        return serveurs.map(data => new ServeurModel(data));
    }

    // Méthode de récupération d'un serveur par son ID
    static async getById(id: number): Promise<ServeurModel | null> {
        const serveur = await ServeurModel.serveursRepository.findById(id);
        return serveur ? new ServeurModel(serveur) : null;
    }

    // Méthode de récupération des ID des serveurs primaire et secondaire
    static async getStartedServeursId(): Promise<ServeurParametersInterface | null> {
        return await ServeurModel.serveursParametersRepository.getServeursId();
    }

// Méthode pour récupérer seulement les serveurs actifs et globaux
    static async getServeursActifGlobal(): Promise<ServeurModel[]> {
        // 1. Récupération brute des données via ton repository
        const serveurs = await ServeurModel.serveursRepository.findAll();

        // 2. Filtrage des serveurs actifs et globaux
        const serveursActifGlobal = serveurs.filter(
            (serveur: ServeurInterface) => serveur.actif && serveur.global
        );

        // 3. Conversion en instances de ModelServeur si besoin
        return serveursActifGlobal.map((data: ServeurInterface) => new ServeurModel(data));
    }


    static async getServeursActifGlobalByGame(game : string): Promise<ServeurModel[]> {
        // 1. Récupération brute des données via ton repository
        const serveurs = await ServeurModel.serveursRepository.findAll();

        // 2. Filtrage des serveurs actifs et globaux
        const serveursActifGlobal = serveurs.filter(
            (serveur: ServeurInterface) => serveur.actif && serveur.global && serveur.jeu.toLowerCase() === game.toLowerCase()
        );

        // 3. Conversion en instances de ModelServeur si besoin
        return serveursActifGlobal.map((data: any) => new ServeurModel(data));
    }

    // Méthode de récupération des informations des serveurs primaire et secondaire
    static async getStartedServeursInfo(): Promise<ServeurModel[] | null> {
        const serveursStartedId = await ServeurModel.getStartedServeursId();

        // Vérification si les serveurs primaire et secondaire existent
        if (serveursStartedId) {
            const serveursPrimary = await ServeurModel.getById(serveursStartedId.id_serv_primaire);
            const serveursSecondaire = await ServeurModel.getById(serveursStartedId.id_serv_secondaire);

            // Ajout de la propriété nb_players pour chaque serveur
            if (serveursPrimary) {
                serveursPrimary.players_online = await ServeurModel.serveursService.getPlayersCount(serveursPrimary);
            }
            if (serveursSecondaire) {
                serveursSecondaire.players_online = await ServeurModel.serveursService.getPlayersCount(serveursSecondaire);
            }

            if (serveursPrimary && serveursSecondaire) {
                return [serveursPrimary, serveursSecondaire];
            }
            return null;
        }
        return null;
    }

    // Méthode de création d'un serveur
    static async create(data: Partial<ServeurInterface>): Promise<ServeurModel> {
        const nextId = await ServeurModel.serveursRepository.getNextId();
        const serveur = new ServeurModel({ ...data, id: nextId });
        await ServeurModel.serveursRepository.save(serveur);
        return serveur;
    }

    // Méthode de suppression d'un serveur
    static async delete(id: number): Promise<boolean> {
        return await ServeurModel.serveursRepository.delete(id);
    }

    // ---------------- MÉTHODES GESTION DU LANCEMENT / ARRET DU SERVEUR / INSTALLATION ------------------

    // Méthode de lancement du serveur
    static async start(serveur: ServeurModel): Promise<boolean> {
        return (await ServeurModel.serveursParametersRepository.updateActifServeur(serveur.id));
    }

    // ---------------------------------------------------------------------------------------------------

}