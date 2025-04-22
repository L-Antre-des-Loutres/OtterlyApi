export class Model {

    // Propriété id de type number
    id: number;

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

}
