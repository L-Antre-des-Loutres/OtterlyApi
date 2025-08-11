import {Repository} from "../../../otterly/abstractClass/repositories/Repository";
import {BadgesCategoriesInterface} from "./CategoriesInterface";


export class BadgesCategoriesRepository extends Repository<BadgesCategoriesInterface>{
    constructor() {
        super("badges_categories");
    }
}