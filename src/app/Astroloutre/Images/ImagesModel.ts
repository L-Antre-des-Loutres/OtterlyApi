import {Model} from "../../../otterly/abstractClass/models/Model";
import {AstroloutreImagesInterface} from "./ImagesInterface";
import {AstroloutreImagesRepository} from "./ImagesRepository";

/**
 * Represents the AstroloutreImagesModel class which implements the AstroloutreImagesInterface.
 * This class is used to define and manage the data related to Astroloutre images.
 */

export class AstroloutreImagesModel extends Model implements AstroloutreImagesInterface{

    id: number
    nom: string
    origine: string
    auteur: string
    path: string
    jeu: string
    carrousel: boolean

    constructor(data: Partial<AstroloutreImagesInterface>) {
        super(data);
        this.id = data.id ?? 0;
        this.nom = data.nom ?? "";
        this.origine = data.origine ?? "";
        this.auteur = data.auteur ?? "";
        this.path = data.path ?? "";
        this.jeu = data.jeu ?? "";
        this.carrousel = data.carrousel ?? true;
    }

    private readonly repository = new AstroloutreImagesRepository();

    // Méthode pour obtenir l'ensemble des images
    async getAll(){
        return await this.repository.getAll();
    }

    // Méthode pour obtenir les images par le jeu
    async getByGame(jeu: string){
        return await this.repository.getByGame(jeu)
    }
}