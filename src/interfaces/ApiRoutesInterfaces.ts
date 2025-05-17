export interface ApiRoutesInterface {
    id?: number;
    alias: string;
    route: string;
    method: string;
    parameters: string;
    description?: string;
    comment?: string;
}