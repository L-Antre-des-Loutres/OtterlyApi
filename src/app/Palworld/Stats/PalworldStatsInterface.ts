/**
 * Represents the statistics interface for a player in Palworld.
 *
 * This interface defines the structure for a player's statistics data
 * associated within the specific server of Palworld.
 *
 * Properties:
 * - `id`: A unique identifier for the player's statistics record.
 * - `serveur_id`: The identifier of the server where the player is located.
 * - `compte_id`: The account ID of the player.
 * - `tmps_jeux`: The total gameplay time of the player, measured in seconds.
 * - `nb_mort`: The number of times the player has died.
 * - `nb_kills`: The number of kills performed by the player.
 * - `nb_boss_kill`: The number of boss kills completed by the player.
 * - `nb_tower_win`: The number of tower victories achieved by the player.
 * - `dern_enregistrment`: The timestamp of the player's last recorded statistics.
 * - `serveur_playername`: The player's username on the server.
 */

export interface PalworldStatsInterface {
    id: number
    serveur_id: number
    compte_id: string
    tmps_jeux: number
    nb_mort: number
    nb_kills: number
    nb_boss_kill: number
    nb_tower_win: number
    dern_enregistrment: string
    serveur_playername: string
}