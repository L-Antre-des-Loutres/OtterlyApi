/**
 * Interface representing the structure of Astroloutre badge information.
 *
 * Provides details about a badge, including its identifier, name, associated category,
 * status, image URL, description (optional), and how it is obtained.
 *
 * Properties:
 * - `id`: Unique identifier for the badge.
 * - `nom`: Name of the badge.
 * - `categorie_id`: Identifier for the category to which the badge belongs.
 * - `actif`: Indicates if the badge is active (true or false).
 * - `image_url`: URL of the badge's associated image.
 * - `description`: Optional description providing additional details about the badge.
 * - `obtention`: Description of how the badge is obtained.
 */

export interface BadgesCategoriesInterface {
    id : number
    nom : string
}