import {Repository} from "./Repository";
import {JoueursInterface} from "../interfaces/JoueursInterface";

export class RepositoryJoueurs extends Repository<JoueursInterface> {
    constructor() {
        super("joueurs");
    }
}