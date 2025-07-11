// src/interfaces/UtilisateursDiscordInterface.ts

/**
 * TODO
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
}