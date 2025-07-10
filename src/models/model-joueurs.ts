// src/models/model-joueurs

/**
 * TODO
 */

import { Model } from "./Model";
import { JoueursInterface } from "../interfaces/JoueursInterface";
import {RepositoryJoueurs} from "../repositories/repository-joueurs";

export class ModelJoueurs extends Model implements JoueursInterface {
    id: number;
    utilisateur_id: number;
    jeu: string;
    compte_id: string;
    premiere_co: string;
    derniere_co: string;
    playername: string;

    constructor(data: Partial<JoueursInterface> = {}) {
        super(data);

        this.id = Number(data.id) || 0;
        this.utilisateur_id = Number(data.utilisateur_id) || 0;
        this.jeu = data.jeu ?? "";
        this.compte_id = data.compte_id ?? "";
        this.premiere_co = data.premiere_co ?? "";
        this.derniere_co = data.derniere_co ?? "";
        this.playername = data.playername ?? "";
    }

    // Initialisation du repository
    private readonly repository = new RepositoryJoueurs();

    async getAll(){
        return await this.repository.findAll();
    }
}
