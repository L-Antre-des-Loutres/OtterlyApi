/**
 * Represents the structure of a badge-user relationship entity.
 *
 * This entity defines the relationship between a user and a badge they have received,
 * including the timestamp of when the badge was awarded.
 *
 * @interface BadgesUtilisateursInterface
 * @property {number} id - The unique identifier of the badge-user association.
 * @property {number} utilisateur_id - The unique identifier of the associated user.
 * @property {number} badge_id - The unique identifier of the associated badge.
 * @property {string} date_recu - The timestamp specifying when the badge was received.
 */

export interface BadgesUtilisateursInterface {
    id : number
    utilisateur_id : number
    badge_id : number
    date_recu : string
}