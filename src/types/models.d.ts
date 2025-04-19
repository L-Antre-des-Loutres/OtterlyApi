export type Serveur = {
    name: string;
    id: number;
    nom: string;
    jeu: string;
    version: string;
    modpack: string;
    modpack_url: string | null;
    nom_monde: string;
    embed_color: string;
    path_serv: string;
    start_script: string;
    actif: boolean;
    global: boolean;
};