// src/models/model-astroloutre_image.ts

import {Model} from "./Model";
import {AstroloutreImagesInterface} from "../interfaces/AstroloutreImagesInterface";
import {RepositoryAstroLoutreImage} from "../repositories/repository-astroloutre_images";

/**
 * TODO
 */

export class ModelAstroloutreImage extends Model implements AstroloutreImagesInterface{

    id: number
    nom: string
    origine: string
    auteur: string
    path: string
    jeu: string

    constructor(data: Partial<AstroloutreImagesInterface>) {
        super(data);
        this.id = data.id ?? 0;
        this.nom = data.nom ?? "";
        this.origine = data.origine ?? "";
        this.auteur = data.auteur ?? "";
        this.path = data.path ?? "";
        this.jeu = data.jeu ?? "";
    }

    private readonly repository = new RepositoryAstroLoutreImage();

    // Méthode pour obtenir l'ensemble des images
    async getAll(){
        return await this.repository.findAll();
    }

    // Méthode pour obtenir les images par le jeu
    async getByGame(jeu: string){
        return await this.repository.getByGame(jeu)
    }
}