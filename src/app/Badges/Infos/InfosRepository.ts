import {Repository} from "../../../otterly/abstractClass/repositories/Repository";
import {AstroloutreBadgesInfosInterface} from "./InfosInterface";


export class AstroloutreBadgesInfosRepository extends Repository<AstroloutreBadgesInfosInterface>{
    constructor() {
        super("badges");
    }
}