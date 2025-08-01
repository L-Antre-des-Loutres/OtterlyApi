// src/repositories/ExampleRepository.ts.

import {Repository} from "../../otterly/abstractClass/repositories/Repository";
import {ExampleInterface} from "./ExampleInteface";

/**
 * ExampleRepository is a class that extends the base Repository class,
 * specifically designed to manage and interact with `UtilisateursDiscordInterface` objects
 * stored in the "utilisateurs_discord" table or collection.
 *
 * This repository provides methods to perform operations on this data source,
 * leveraging functionalities from its parent Repository class.
 *
 * Methods:
 * - getAll: Fetches all the records from the data source related to this repository.
 */

export class ExampleRepository extends Repository<ExampleInterface>{
    constructor() {
        super("Nom de votre table");
    }
}