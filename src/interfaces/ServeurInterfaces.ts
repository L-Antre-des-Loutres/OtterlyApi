// src/interfaces/ServeurInterfaces.ts

/**
 * Interface ServeurInterface
 * @interface ServeurInterface
 * @property {number} id - L'identifiant du serveur.
 * @property {string} nom - Le nom du serveur.
 * @property {string} jeu - Le jeu du serveur.
 * @property {string} version - La version du serveur.
 * @property {string} modpack - Le modpack du serveur.
 * @property {string} modpack_url - L'URL du modpack du serveur.
 * @property {string} nom_monde - Le nom du monde du serveur.
 * @property {string} embed_color - La couleur de l'embed du serveur.
 * @property {string} path_serv - Le chemin du serveur.
 * @property {string} start_script - Le script de démarrage du serveur.
 * @property {boolean} actif - Indique si le serveur est actif.
 * @property {boolean} global - Indique si le serveur est global.
 */

export interface ServeurInterface {
    id: number;
    nom : string;
    jeu : string;
    version : string;
    modpack : string;
    modpack_url : string;
    nom_monde : string;
    embed_color : string;
    contenaire : string;
    description : string;
    actif : boolean;
    global : boolean;
    type : string;
    image?: string
}