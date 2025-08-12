import {Repository} from "../../../otterly/abstractClass/repositories/Repository";
import {BadgesUtilisateursInterface} from "./UtilisateursInterface";

/**
 * Repository class for managing operations related to the "badges_utilisateurs" collection.
 * This class extends the generic Repository and operates on objects adhering to the BadgesUtilisateursInterface.
 * It provides a mechanism to interact with the underlying "badges_utilisateurs" data source.
 */

export class BadgesUtilisateursRepository extends Repository<BadgesUtilisateursInterface>{
    constructor() {
        super("badges_utilisateurs");
    }
}