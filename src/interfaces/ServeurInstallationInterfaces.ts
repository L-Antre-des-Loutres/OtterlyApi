// src/interfaces/ServeurInstallationInterfaces.ts

/**
 * Interface representing the installation details for a Minecraft server.
 *
 * This interface is used to define the structure of data related to the setup
 * and configuration of a Minecraft server, including optional properties for
 * customizations and additional data sources.
 *
 * Properties:
 * @property {string} discord_id - The unique identifier of the Discord server associated with the Minecraft server.
 * @property {string} nom_serveur - The name of the Minecraft server.
 * @property {string} version - The version of Minecraft the server is running.
 * @property {string} [modpack_name] - The name of the modpack being used on the server (optional).
 * @property {string} [embed_color] - The hexadecimal color code used for embeds related to the server (optional).
 * @property {string} [serveur_loader] - The loader being used for running the server, such as Forge or Fabric (optional).
 * @property {string} [modpack_url] - The URL where the modpack can be downloaded (optional).
 * @property {string} [serveur_pack_url] - The URL where the server's configuration pack can be downloaded (optional).
 */

export interface ServeurMinecraftInstallationInterface {
    discord_id: string;
    nom_serveur: string;
    version: string;
    modpack_name?: string;
    embed_color?: string;
    serveur_loader?: string;
    modpack_url?: string;
    serveur_pack_url?: string;
}
