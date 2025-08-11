import {Model} from "../../../otterly/abstractClass/models/Model";
import {BadgesInfosInterface} from "./InfosInterface";
import {BadgesInfosRepository} from "./InfosRepository";

/**
 * Represents a model for Astroloutre images. This class is designed to handle
 * the data and logic related to Astroloutre images, including their retrieval
 * and associated details.
 *
 */

export class BadgesInfosModel extends Model implements BadgesInfosInterface{

    nom : string
    categorie_id : number
    actif : boolean
    image_url : string
    description? : string
    obtention : string

    constructor(data: Partial<BadgesInfosInterface>) {
        super(data);
        this.nom = data.nom ?? "";
        this.categorie_id = data.categorie_id ?? 0;
        this.actif = data.actif ?? false;
        this.image_url = data.image_url ?? "";
        this.description = data.description ?? "";
        this.obtention = data.obtention ?? "";
    }

    private readonly repository = new BadgesInfosRepository();

    // Méthode pour obtenir l'ensemble des images
    async getAll(){
        return await this.repository.findAll();
    }

}