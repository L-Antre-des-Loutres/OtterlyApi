// src/models/Model.ts

export class Model {

    // Propriété id de type number
    id: number;
    static readonly models: any;

    // Constructeur de la classe Model
    constructor(data: Partial<Model>) {
        this.id = data.id ?? 0;
    }

    // Méthode qui permet de convertir le model en JSON
    toJSON(): Record<string, any> {
        return {
            id: this.id,
        };
    }

    // Méthode de sauvegarde du model
    save(): void {
        console.log(`[SAVE] ${this.constructor.name}:`, this.toJSON());
    }

    // Méthode de récupération de l'ensemble des informations du model
    static async getAll(): Promise<Model[]> {
        const models = await Model.models.findAll();
        return models;
    }

}
