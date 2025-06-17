// src/models/Model.ts

/**
 * Represents a generic Model class that can be used as a base for other models.
 * Includes functionality for initialization with partial data and converting the
 * instance to a JSON representation.
 */

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
