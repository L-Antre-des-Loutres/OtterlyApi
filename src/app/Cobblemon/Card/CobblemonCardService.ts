import {Service} from "../../../otterly/abstractClass/services/Service";
import {CobblemonStatsModel} from "../Stats/CobblemonStatsModel";

export class CobblemonCardService extends Service {
    constructor() {
        super("CobblemonCard - Service");
    }

    private modelStats = new CobblemonStatsModel({});

    async generate() : Promise<void> {
        try {
            this.logInfo("Génération des cartes Cobblemon...");

            await this.generateCards("all");

        } catch (error) {
            this.logError("Erreur lors de la génération des cartes Cobblemon", error?.toString());
        }
    }

    private async generateCards(uid: string) : Promise<void> {

    }
}