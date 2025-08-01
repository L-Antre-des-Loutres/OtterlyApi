// src/models/ExampleModel.ts

import { Model } from "../app_otterly/otterly/models/Model";
import { ExampleInterface } from "../interfaces/ExampleInteface";
import {ExampleRepository} from "../repositories/ExampleRepository";

/**
 * ExampleModel is a class that extends the base Model class and implements the ExampleInterface.
 * It represents an example data model with specific properties and behaviors.
 * This class contains a unique identifier and utilizes a repository for related operations.
 *
 * ExampleModel provides a structural representation of the ExampleInterface
 * and is designed to work with partial data initialization.
 */

export class ExampleModel extends Model implements ExampleInterface {
    id: number;

    constructor(
        data: Partial<ExampleInterface>,
        private readonly repository: ExampleRepository = new ExampleRepository()
    ) {
        super(data);
        this.id = data.id ?? 0;
    }

    // Vos méthodes ici

    async getAll(): Promise<void> {
        return console.log("Fonction d'exemple")
    }
}
