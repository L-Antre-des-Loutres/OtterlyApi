// src/interfaces/ServeurParametersInterfaces.ts

/**
 * ServeurParametersInterface defines the structure for server parameter settings used in the system.
 *
 * Properties:
 * @property {number} id - L'identifiant du paramètre.
 * @property {number} id_serv_primaire - L'identifiant du serveur primaire.
 * @property {number} id_serv_secondaire - L'identifiant du serveur secondaire.
 * @property {number} id_serv_patenaire - L'identifiant du serveur patenaire.
 * @property {string} host_primaire - L'adresse IP du serveur primaire.
 * @property {string} host_secondaire - L'adresse IP du serveur secondaire.
 * @property {string} host_patenaire - L'adresse IP du serveur patenaire.
 * @property {string} rcon_password - Le mot de passe RCON du serveur primaire.
 * @property {string} rcon_password_patenaire - Le mot de passe RCON du serveur patenaire.
 */

export interface ServeurParametersInterface {
    id: number;
    id_serv_primaire: number;
    id_serv_secondaire: number;
    id_serv_patenaire: number;
    host_primaire: string;
    host_secondaire: string;
    host_patenaire: string;
    rcon_password: string;
    rcon_password_patenaire: string;
}