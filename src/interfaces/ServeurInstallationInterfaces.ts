// Interface ServeurMinecraftInstallationInterface
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
