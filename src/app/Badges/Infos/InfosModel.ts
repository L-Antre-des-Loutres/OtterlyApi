import {Model} from "../../../otterly/abstractClass/models/Model";
import {AstroloutreBadgesInfosInterface} from "./InfosInterface";
import {AstroloutreBadgesInfosRepository} from "./InfosRepository";

/**
 * Represents a model for Astroloutre images. This class is designed to handle
 * the data and logic related to Astroloutre images, including their retrieval
 * and associated details.
 *
 */

export class AstroloutreBadgesInfosModel extends Model implements AstroloutreBadgesInfosInterface{

    nom : string
    categorie_id : number
    actif : boolean
    image_url : string
    description? : string
    obtention : string

    constructor(data: Partial<AstroloutreBadgesInfosInterface>) {
        super(data);
        this.nom = data.nom ?? "";
        this.categorie_id = data.categorie_id ?? 0;
        this.actif = data.actif ?? false;
        this.image_url = data.image_url ?? "";
        this.description = data.description ?? "";
        this.obtention = data.obtention ?? "";
    }

    private readonly repository = new AstroloutreBadgesInfosRepository();

    // Méthode pour obtenir l'ensemble des images
    async getAll(){
        return await this.repository.findAll();
    }

}