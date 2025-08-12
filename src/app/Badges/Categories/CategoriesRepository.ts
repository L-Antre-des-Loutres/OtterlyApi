import {Repository} from "../../../otterly/abstractClass/repositories/Repository";
import {BadgesCategoriesInterface} from "./CategoriesInterface";

/**
 * BadgesCategoriesRepository is a repository class designed to interact with the
 * "badges_categories" collection in the database. It inherits from the base
 * Repository class and provides functionality specific to managing badge categories.
 *
 * This class acts as a data access layer, enabling CRUD operations and other
 * database interactions for badge categories.
 *
 * @extends Repository<BadgesCategoriesInterface>
 */

export class BadgesCategoriesRepository extends Repository<BadgesCategoriesInterface>{
    constructor() {
        super("badges_categories");
    }
}