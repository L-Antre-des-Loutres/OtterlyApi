import {Model} from "../../../otterly/abstractClass/models/Model";
import {BadgesCategoriesInterface} from "./CategoriesInterface";
import {BadgesCategoriesRepository} from "./CategoriesRepository";

/**
 * Represents a model for Astroloutre images. This class is designed to handle
 * the data and logic related to Astroloutre images, including their retrieval
 * and associated details.
 *
 */

export class BadgesCategoriesModel extends Model implements BadgesCategoriesInterface{

    nom : string

    constructor(data: Partial<BadgesCategoriesInterface>) {
        super(data);
        this.nom = data.nom ?? "";
    }

    private readonly repository = new BadgesCategoriesRepository();

    // Méthode pour obtenir l'ensemble des images
    async getAll(){
        return await this.repository.findAll();
    }

}