import {Service} from "../../../otterly/abstractClass/services/Service";
import {UtilisateursDiscordRepository} from "./UtilisateursDiscordRepository";

/**
 * Service class for managing Discord users.
 *
 * This class provides methods to interact with and manage users within the Discord platform.
 * It extends the base Service class to leverage common service functionalities.
 */

export class UtilisateursDiscordService extends Service {
    private readonly repository = new UtilisateursDiscordRepository();

    constructor() {
        super("Utilisateur Discord - Service");
    }

    // On obtient l'ensembles des utilisateurs avec leur statistiques
    async checkDeleteDateUser() {
        const joueurs = await this.repository.getAll();
        for (const joueur of joueurs) {
            if (joueur.delete_date && new Date(joueur.delete_date) <= new Date()) {
                await this.repository.delete(joueur.id);
            }
        }
    }
}