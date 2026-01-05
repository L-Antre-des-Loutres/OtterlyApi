import {Service} from "../../../otterly/abstractClass/services/Service";
import {UtilisateursDiscordModel} from "../../Discord/UtilisateursDiscord/UtilisateursDiscordModel";
import {UtilisateursDiscordStatsModel} from "../../Discord/UtilisateursDiscord/Stats/UtilisateursDiscordStatsModel";
import {BadgesUtilisateursModel} from "./UtilisateursModel";
import {BadgesInfosModel} from "../Infos/InfosModel";


interface AggregatedStats {
    nb_message: number;
    vocal_time: number; // en heures
}

export class BadgesUtilisateursService extends Service {
    private modelUtilisateur: UtilisateursDiscordModel = new UtilisateursDiscordModel({});
    private modelStat: UtilisateursDiscordStatsModel = new UtilisateursDiscordStatsModel({});
    private modelBadgeUtilisateur: BadgesUtilisateursModel = new BadgesUtilisateursModel({});
    private modelBadgeInfo: BadgesInfosModel = new BadgesInfosModel({});

    constructor() {
        super("Utilisateurs Badge - Service");
    }

    /**
     *   {
     *     id: 548,
     *     id_utilisateur: 2313,
     *     nb_message: 1,
     *     vocal_time: '0.00',
     *     date_stats: '04/01/2026',
     *     voice_channels: [],
     *     text_channels: [ [Object] ],
     *     vocal_with: []
     *   }
     */

    async giveBadgesUtilisateurs() {
        try {
            const utilisateurs = await this.modelUtilisateur.getAll();
            const allBadges = await this.modelBadgeInfo.getAll();
            const validBadgeIds = new Set(allBadges.map((b: any) => b.id));

            // On parcout l'ensemble des utilisateurs
            for (const utilisateur of utilisateurs) {
                let nbAddBadges = 0;
                const utilisateurStat = await this.modelStat.getByUserId(utilisateur.id)

                // Agrégation des statistiques
                const aggregatedStats = this.aggregateStats(utilisateurStat);
                const nb_message = aggregatedStats.nb_message;
                const vocal_time = aggregatedStats.vocal_time; // en heures

                const existingBadges = await this.modelBadgeUtilisateur.getByUserId(utilisateur.id)
                const hasBadge = (badgeId: number) => existingBadges.some((badge: any) => badge.badge_id === badgeId)
                const canAddBadge = (badgeId: number) => {
                    if (!validBadgeIds.has(badgeId)) {
                        console.warn(`Badge ID ${badgeId} does not exist in database. Skipping.`);
                        return false;
                    }
                    return !hasBadge(badgeId);
                };

                if (canAddBadge(7)) {
                    await this.modelBadgeUtilisateur.addBadge(utilisateur.id, 7)
                    nbAddBadges++;
                }
                if (nb_message >= 100 && canAddBadge(8)) {
                    await this.modelBadgeUtilisateur.addBadge(utilisateur.id, 8)
                    nbAddBadges++;
                }
                if (nb_message >= 1000 && canAddBadge(9)) {
                    await this.modelBadgeUtilisateur.addBadge(utilisateur.id, 9)
                    nbAddBadges++;
                }
                if (nb_message >= 2000 && canAddBadge(10)) {
                    await this.modelBadgeUtilisateur.addBadge(utilisateur.id, 10)
                    nbAddBadges++;
                }
                if (nb_message >= 5000 && canAddBadge(11)) {
                    await this.modelBadgeUtilisateur.addBadge(utilisateur.id, 11)
                    nbAddBadges++;
                }
                if (nb_message >= 10000 && canAddBadge(12)) {
                    await this.modelBadgeUtilisateur.addBadge(utilisateur.id, 12)
                    nbAddBadges++;
                }

                if (vocal_time > 0 && canAddBadge(15)) {
                    await this.modelBadgeUtilisateur.addBadge(utilisateur.id, 15)
                    nbAddBadges++;
                }

                if (vocal_time >= 100 && canAddBadge(16)) {
                    await this.modelBadgeUtilisateur.addBadge(utilisateur.id, 16)
                    nbAddBadges++;
                }

                if (vocal_time >= 500 && canAddBadge(17)) {
                    await this.modelBadgeUtilisateur.addBadge(utilisateur.id, 17)
                    nbAddBadges++;
                }

                if (vocal_time >= 1000 && canAddBadge(18)) {
                    await this.modelBadgeUtilisateur.addBadge(utilisateur.id, 18)
                    nbAddBadges++;
                }

                if (vocal_time >= 10000 && canAddBadge(19)) {
                    await this.modelBadgeUtilisateur.addBadge(utilisateur.id, 19)
                    nbAddBadges++;
                }

                if (nbAddBadges != 0) {
                    console.log(`${nbAddBadges} badge(s) add to user ${utilisateur.id}`)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Assigns badges to users by retrieving all users and their associated statistics.
     *
     * @return {Promise<void>} A promise that resolves when the operation completes.
     */

    /**
     * Aggregates statistics for a user by summing nb_message and converting vocal_time to hours.
     *
     * @param {any[]} stats - Array of user statistics
     * @return {AggregatedStats} Aggregated statistics with total messages and vocal time in hours
     */
    private aggregateStats(stats: any[]): AggregatedStats {
        let totalMessages = 0;
        let totalVocalTimeHours = 0;

        for (const stat of stats) {
            totalMessages += stat.nb_message || 0;
            // Convert decimal vocal_time to hours (assuming it's stored as decimal hours)
            const vocalTime = parseFloat(stat.vocal_time) || 0;
            totalVocalTimeHours += vocalTime;
        }

        return {
            nb_message: totalMessages,
            vocal_time: totalVocalTimeHours
        };
    }

}