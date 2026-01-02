/**
 * Interface representing Discord user statistics.
 *
 * This interface defines the structure of the data related to statistics
 * for a Discord user, including their identifier, message count, vocal time,
 * and the associated year.
 */
export interface UtilisateursDiscordStatsInterface {
    id: number
    id_utilisateur: number
    nb_message: number
    vocal_time: number
    date_stats: string
    voice_channels: Channel[]
    text_channels: Channel[]
    vocal_with: DiscordUser[]
}

export interface Channel {
    id: string,
    name: string
}

export interface DiscordUser {
    id: string,
    username: string
}