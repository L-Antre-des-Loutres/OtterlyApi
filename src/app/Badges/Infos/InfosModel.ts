import {Model} from "../../../otterly/abstractClass/models/Model";
import {BadgesInfosInterface} from "./InfosInterface";
import {BadgesInfosRepository} from "./InfosRepository";

/**
 * Represents the Badge Information Model which includes properties and methods related to the badge details.
 * Extends the base `Model` class and implements the `BadgesInfosInterface`.
 * Provides functionality to manage badge information such as retrieving all badge details.
 *
 * Properties:
 * - `nom`: The name of the badge.
 * - `categorie_id`: The identifier of the category to which the badge belongs.
 * - `actif`: A boolean indicating whether the badge is active.
 * - `image_url`: The URL of the badge image.
 * - `description`: An optional description of the badge.
 * - `obtention`: Information about how the badge is obtained.
 *
 * Constructor:
 * - Accepts a `Partial<BadgesInfosInterface>` object to initialize the badge information fields.
 *
 * Methods:
 * - `getAll()`: Asynchronously retrieves all badge records using the associated repository.
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