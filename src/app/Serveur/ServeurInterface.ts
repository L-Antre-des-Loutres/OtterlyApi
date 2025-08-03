/**
 * Interface representing a server configuration.
 *
 * @interface ServeurInterface
 * @property {number} id - Unique identifier for the server.
 * @property {string} nom - Name of the server.
 * @property {string} jeu - Name of the game the server is hosting.
 * @property {string} version - Version of the game or server software.
 * @property {string} modpack - Name of the modpack used, if any.
 * @property {string} modpack_url - URL of the modpack, if applicable.
 * @property {string} nom_monde - Name of the game world hosted by the server.
 * @property {string} embed_color - Color used for any embedding purposes.
 * @property {string} contenaire - Name or identifier of the container managing the server.
 * @property {string} description - Description of the server.
 * @property {boolean} actif - Indicates whether the server is active.
 * @property {boolean} global - Indicates whether the server has a global configuration.
 * @property {string} type - Type of the server.
 * @property {string} [image] - Optional property for a server image or thumbnail.
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