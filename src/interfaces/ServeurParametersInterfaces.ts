// Interface ServeurParametersInterface
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