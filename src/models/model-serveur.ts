import { ServeurInterface } from "../interfaces/ServeurInterfaces";
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

    // Méthode qui permet de convertir le model en JSON
    toJSON(): Partial<ServeurInterface> {
        return {
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
    start() {
        console.log(`🚀 Démarrage du serveur "${this.nom}" avec ${this.start_script}`);
        // Logique de démarrage du serveur ici
    }

    // Méthode de fermeture du serveur
    stop() {
        console.log(`🛑 Arrêt du serveur "${this.nom}"`);
        // Logique d'arrêt du serveur ici
    }
}
