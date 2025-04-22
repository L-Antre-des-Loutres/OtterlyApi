// Interface ServeurInterface
export interface ServeurInterface {
    id: number;
    nom : string;
    jeu : string;
    version : string;
    modpack : string;
    modpack_url : string;
    nom_monde : string;
    embed_color : string;
    path_serv : string;
    start_script : string;
    actif : boolean;
    global : boolean;
}