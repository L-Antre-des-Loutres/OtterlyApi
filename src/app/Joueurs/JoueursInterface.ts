/**
 * Interface representing a player in a gaming system.
 *
 * This interface defines the structure for managing player data, including
 * identifiers, account details, and login activity.
 *
 * Properties:
 * - id: A unique identifier for the player.
 * - utilisateur_id: Identifier linking the player to a user entity in the system.
 * - jeu: The name of the game associated with the player.
 * - compte_id: Identifier for the player's game account.
 * - premiere_co: The timestamp of the player's first connection.
 * - derniere_co: The timestamp of the player's most recent connection.
 * - playername: The player's chosen in-game username.
 */

export interface JoueursInterface {
    id: number,
    utilisateur_id: number,
    jeu: string,
    compte_id: string,
    premiere_co: string,
    derniere_co: string,
    playername: string,
}