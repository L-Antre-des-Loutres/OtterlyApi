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

}
