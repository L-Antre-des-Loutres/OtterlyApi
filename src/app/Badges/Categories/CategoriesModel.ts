import {Model} from "../../../otterly/abstractClass/models/Model";
import {BadgesCategoriesInterface} from "./CategoriesInterface";
import {BadgesCategoriesRepository} from "./CategoriesRepository";

/**
 * The BadgesCategoriesModel class extends the base Model class and implements the BadgesCategoriesInterface.
 * This class is used to manage badge categories, storing their properties and interacting with the associated repository for database operations.
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