/**
 * Interface representing the structure of Astroloutre images.
 *
 * @interface AstroloutreImagesInterface
 *
 * @property {number} id The unique identifier for the image.
 * @property {string} nom The name of the image.
 * @property {string} origine The origin or source of the image.
 * @property {string} auteur The author or creator of the image.
 * @property {string} path The file path or URL of the image.
 * @property {string} jeu The game or context associated with the image.
 */

export interface AstroloutreImagesInterface {
    id: number,
    nom: string,
    origine: number,
    auteur: number,
    path: string,
    jeu: string,
    carrousel: boolean,
}