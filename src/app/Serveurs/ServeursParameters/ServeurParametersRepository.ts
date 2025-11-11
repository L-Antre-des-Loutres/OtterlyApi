import {Repository} from "../../../otterly/abstractClass/repositories/Repository";
import {ServeurParametersInterface} from "./ServeurParametersInterface";

/**
 * ServeurParametersRepository is a repository class that provides methods
 * to interact with the "serveurs_parameters" database table. It extends
 * the generic Repository class to perform operations specific to server parameters.
 */

export class ServeurParametersRepository extends Repository<ServeurParametersInterface> {
    constructor() {
        super("serveurs_parameters");
    }

    // Méthode pour récupérer l'information complète de la table
    async getAll(): Promise<ServeurParametersInterface[]> {
        return await super.findAll();
    }
}