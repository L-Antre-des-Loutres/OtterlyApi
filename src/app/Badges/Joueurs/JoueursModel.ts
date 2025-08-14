import {Model} from "../../../otterly/abstractClass/models/Model";
import {BadgesJoueursInterface} from "./JoueursInterface";
import {BadgesJoueursRepository} from "./JoueursRepository";

/**
 * Represents the model for user badges, handling the relationship
 * between users and their acquired badges.
 * Extends the base 'Model' class and implements the 'BadgesJoueursInterface'.
 */

export class BadgesJoueursModel extends Model implements BadgesJoueursInterface{

    joueur_id: number;
    badge_id: number;
    date_recu: string;

    constructor(data: Partial<BadgesJoueursInterface>) {
        super(data);
        this.joueur_id = data.joueur_id ?? 0;
        this.badge_id = data.badge_id ?? 0;
        this.date_recu = data.date_recu ?? "";
    }

    private readonly repository = new BadgesJoueursRepository();

    async getAll(){
        return await this.repository.findAll();
    }

}