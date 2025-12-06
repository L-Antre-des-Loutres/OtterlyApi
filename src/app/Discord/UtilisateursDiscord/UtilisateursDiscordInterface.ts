/**
 * Interface representing a Discord user.
 *
 * This interface defines the structure of a Discord user object, including
 * their identification information, activity details, and message statistics.
 *
 * Properties:
 * - id: The unique identifier of the user in the application.
 * - discord_id: The unique identifier of the user on Discord.
 * - tag_discord: The full Discord tag of the user (e.g., username#1234).
 * - pseudo_discord: The username of the user on Discord.
 * - join_date_discord: The date the user joined Discord.
 * - first_activity: The timestamp of the user's first recorded activity, if available.
 * - last_activity: The timestamp of the user's most recent recorded activity, if available.
 * - nb_message: The total number of messages the user has sent.
 */

export interface UtilisateursDiscordInterface {
    id: number;
    discord_id: string;
    tag_discord: string;
    pseudo_discord: string;
    join_date_discord: string;
    first_activity: string | null;
    last_activity: string | null;
    nb_message: number;
    avatar_url: string;
    roles: Roles[] | null;
    delete_date: string | null;
}

export interface Roles {
    id: string;
    name: string;
    color: string;
}