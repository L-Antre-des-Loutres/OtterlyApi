import e from "express";
import { ServeurInterface } from "../interfaces/ServeurInterfaces";
import { RepositoryServeur } from "../repositories/repository-serveur";
import { ServiceServeur } from "../services/service-serveur";
import { Model } from "./Model";

export class ModelServeur extends Model {

    nom: string;
    jeu: string;
    version: string;
    modpack: string;
    modpack_url: string;
    nom_monde: string;
    embed_color: string;
    path_serv: string;
    start_script: string;
    actif: boolean;
    global: boolean;

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
        this.path_serv = data.path_serv ?? "";
        this.start_script = data.start_script ?? "";
        this.actif = data.actif ?? false;
        this.global = data.global ?? false;
    }

    // Initialisation du repository Serveur
    private static readonly serveurs = new RepositoryServeur();

    // Initialisation du service Serveur
    private static readonly serviceServeur = new ServiceServeur();

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
            path_serv: this.path_serv,
            start_script: this.start_script,
            actif: this.actif,
            global: this.global,
        };
    }

    // Méthode de lancement du serveur
    static async start(serveur: ModelServeur): Promise<boolean> {
        if (await ModelServeur.serviceServeur.startServeur(serveur)) {
            return true;
        } else {
            return false;
        }
    }

    // Méthode de fermeture du serveur
    static async stop(serveur: ModelServeur): Promise<boolean> {
        if(await ModelServeur.serviceServeur.stopServeur(serveur)) {
            return true;
        } else {
            return false;
        }
    }

    // Méthode de récupération de l'ensemble des serveurs
    static async getAll(): Promise<ModelServeur[]> {
        const serveurs = await ModelServeur.serveurs.findAll();
        return serveurs.map(data => new ModelServeur(data));
    }

    // Méthode de récupération d'un serveur par son ID
    static async getById(id: number): Promise<ModelServeur | null> {
        const serveur = await ModelServeur.serveurs.findById(id);
        return serveur ? new ModelServeur(serveur) : null;
    }

    // Méthode de création d'un serveur
    static async create(data: Partial<ServeurInterface>): Promise<ModelServeur> {
        const nextId = await ModelServeur.serveurs.getNextId();
        const serveur = new ModelServeur({ ...data, id: nextId });
        await ModelServeur.serveurs.save(serveur);
        return serveur;
    }

    // Méthode de suppression d'un serveur 
    static async delete(id: number): Promise<boolean> {
        const deleted = await ModelServeur.serveurs.delete(id);
        return deleted;
    }
}
