export interface I_Controller {
    getAll(): Promise<any>;
    getById(id: number): Promise<any>;
    insert(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<any>;
}