import {Service} from "../../../otterly/abstractClass/services/Service";
import {JoueursModel} from "../../Joueurs/JoueursModel";
import {JoueursStatsModel} from "../../Joueurs/JoueursStats/JoueursStatsModel";
import {BadgesJoueursModel} from "./JoueursModel";
import {BadgesInfosModel} from "../Infos/InfosModel";


interface AggregatedStats {
    play_time: number;
}

export class BadgesJoueursService extends Service {
    private modelJoueurs: JoueursModel = new JoueursModel({});
    private modelStat: JoueursStatsModel = new JoueursStatsModel({});
    private modelBadgeJoueur: BadgesJoueursModel = new BadgesJoueursModel({});
    private modelBadgeInfo: BadgesInfosModel = new BadgesInfosModel({});

    constructor() {
        super("Joueurs Badge - Service");
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

    async giveBadgesJoueurs() {
        try {
            const utilisateurs = await this.modelJoueurs.getAll();
            const allBadges = await this.modelBadgeInfo.getAll();
            const validBadgeIds = new Set(allBadges.map((b: any) => b.id));

            // On parcout l'ensemble des utilisateurs
            for (const utilisateur of utilisateurs) {
                let nbAddBadges = 0;
                const utilisateurStat = await this.modelStat.getStatsByUid(utilisateur.compte_id)

                // Agrégation des statistiques
                const aggregatedStats = this.aggregateStats(utilisateurStat);
                const play_time = aggregatedStats.play_time;

                const existingBadges = await this.modelBadgeJoueur.getByPlayerId(utilisateur.id)
                const hasBadge = (badgeId: number) => existingBadges.some((badge: any) => badge.badge_id === badgeId)
                const canAddBadge = (badgeId: number) => {
                    if (!validBadgeIds.has(badgeId)) {
                        console.warn(`Badge ID ${badgeId} does not exist in database. Skipping.`);
                        return false;
                    }
                    return !hasBadge(badgeId);
                };

                if (canAddBadge(1) && play_time >= 1) {
                    await this.modelBadgeJoueur.addBadge(utilisateur.id, 1)
                    nbAddBadges++;
                }

                if (canAddBadge(2) && play_time >= 50) {
                    await this.modelBadgeJoueur.addBadge(utilisateur.id, 2)
                    nbAddBadges++;
                }

                if (canAddBadge(3) && play_time >= 500) {
                    await this.modelBadgeJoueur.addBadge(utilisateur.id, 3)
                    nbAddBadges++;
                }

                if (canAddBadge(4) && play_time >= 1000) {
                    await this.modelBadgeJoueur.addBadge(utilisateur.id, 4)
                    nbAddBadges++;
                }

                if (canAddBadge(5) && play_time >= 2000) {
                    await this.modelBadgeJoueur.addBadge(utilisateur.id, 5)
                    nbAddBadges++;
                }

                if (nbAddBadges != 0) {
                    console.log(`${nbAddBadges} badge(s) add to player ${utilisateur.id}`)
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
        let totalPlayTime = 0;

        for (const stat of stats) {
            const playtime = stat.tmps_jeux / 72000
            totalPlayTime += playtime;
        }

        return {
            play_time: totalPlayTime
        };
    }

}