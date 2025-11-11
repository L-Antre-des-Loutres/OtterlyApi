import {ServeursInterface} from "./ServeursInterface";
import {Model} from "../../otterly/abstractClass/models/Model";
import {ServeursRepository} from "./ServeursRepository";
import {ServeurParametersRepository} from "./ServeursParameters/ServeurParametersRepository";
import {ServeurService} from "./ServeurService";
import {ServeurParametersInterface} from "./ServeursParameters/ServeurParametersInterface";

/**
 * Represents a model for a server, providing properties and methods to manage server data.
 * Extends the base `Model` class and implements `ServeurInterface`.
 */

export class ServeursModel extends Model implements ServeursInterface {

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
    constructor(data: Partial<ServeursInterface>) {
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
    private static readonly serveursRepository = new ServeursRepository();

    // Initialisation du repository Serveur Parameters
    private static readonly serveursParametersRepository = new ServeurParametersRepository();

    // Initialisation du service Serveur
    private static readonly serveursService = new ServeurService();

    // Méthode qui permet de convertir le model en JSON
    toJSON(): Partial<ServeursInterface> {
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
    static async getAll(): Promise<ServeursModel[]> {
        const serveurs = await ServeursModel.serveursRepository.findAll();
        return serveurs.map(data => new ServeursModel(data));
    }

    // Méthode de récupération d'un serveur par son ID
    static async getById(id: number): Promise<ServeursModel | null> {
        const serveur = await ServeursModel.serveursRepository.findById(id);
        return serveur ? new ServeursModel(serveur) : null;
    }

    // Méthode de récupération des ID des serveurs primaire et secondaire
    static async getStartedServeurs(): Promise<ServeurParametersInterface[]> {
        return await ServeursModel.serveursParametersRepository.getAll();
    }

// Méthode pour récupérer seulement les serveurs actifs et globaux
    static async getServeursActifGlobal(): Promise<ServeursModel[]> {
        // 1. Récupération brute des données via ton repository
        const serveurs = await ServeursModel.serveursRepository.findAll();

        // 2. Filtrage des serveurs actifs et globaux
        const serveursActifGlobal = serveurs.filter(
            (serveur: ServeursInterface) => serveur.actif && serveur.global
        );

        // 3. Conversion en instances de ModelServeur si besoin
        return serveursActifGlobal.map((data: ServeursInterface) => new ServeursModel(data));
    }


    static async getServeursActifGlobalByGame(game : string): Promise<ServeursModel[]> {
        // 1. Récupération brute des données via ton repository
        const serveurs = await ServeursModel.serveursRepository.findAll();

        // 2. Filtrage des serveurs actifs et globaux
        const serveursActifGlobal = serveurs.filter(
            (serveur: ServeursInterface) => serveur.actif && serveur.global && serveur.jeu.toLowerCase() === game.toLowerCase()
        );

        // 3. Conversion en instances de ModelServeur si besoin
        return serveursActifGlobal.map((data: any) => new ServeursModel(data));
    }


    // Méthode de création d'un serveur
    static async create(data: Partial<ServeursInterface>): Promise<ServeursModel> {
        const nextId = await ServeursModel.serveursRepository.getNextId();
        const serveur = new ServeursModel({ ...data, id: nextId });
        await ServeursModel.serveursRepository.save(serveur);
        return serveur;
    }

    // Méthode de suppression d'un serveur
    static async delete(id: number): Promise<boolean> {
        return await ServeursModel.serveursRepository.delete(id);
    }

    // ---------------- MÉTHODES GESTION DU LANCEMENT / ARRET DU SERVEUR / INSTALLATION ------------------
    // ---------------------------------------------------------------------------------------------------

}