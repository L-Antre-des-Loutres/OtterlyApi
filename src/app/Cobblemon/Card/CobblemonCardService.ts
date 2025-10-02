import {Service} from "../../../otterly/abstractClass/services/Service";
import path from "node:path";

export class CobblemonCardService extends Service {
    constructor() {
        super("CobblemonCard - Service");
    }

    async getCard() {
        return path.join(__dirname, "../../../assets/cobblemon/card.png");
    }
}