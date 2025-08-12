import {Model} from "../../../otterly/abstractClass/models/Model";
import {BadgesUtilisateursInterface} from "./UtilisateursInterface";
import {BadgesUtilisateursRepository} from "./UtilisateursRepository";

/**
 * Represents the model for user badges, handling the relationship
 * between users and their acquired badges.
 * Extends the base 'Model' class and implements the 'BadgesUtilisateursInterface'.
 */

export class BadgesUtilisateursModel extends Model implements BadgesUtilisateursInterface{

    utilisateur_id: number;
    badge_id: number;
    date_recu: string;

    constructor(data: Partial<BadgesUtilisateursInterface>) {
        super(data);
        this.utilisateur_id = data.utilisateur_id ?? 0;
        this.badge_id = data.badge_id ?? 0;
        this.date_recu = data.date_recu ?? "";
    }

    private readonly repository = new BadgesUtilisateursRepository();

    // Méthode pour obtenir l'ensemble des images
    async getAll(){
        return await this.repository.findAll();
    }

}