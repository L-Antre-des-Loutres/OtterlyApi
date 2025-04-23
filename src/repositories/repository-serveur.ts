// src/repositories/repository-serveur.ts

import { ServeurInterface } from "../interfaces/ServeurInterfaces";
import { Repository } from "./Repository";

export class RepositoryServeur extends Repository<ServeurInterface> {
    constructor() {
        super("serveurs");
    }

    // Méthode pour récupérer le prochain ID
    async getNextId(): Promise<number> {
        const nextId = await super.getNextId();
        return nextId;
    }

    // Méthode pour sauvegarder un serveur
    async save(serveur: ServeurInterface): Promise<void> {
        await super.save(serveur);
        console.log(`🗒️  Serveur ${serveur.id} enregistré avec succès dans la base de données.`);
    }

    // Méthode pour trouver un serveur par ID
    async findById(id: number): Promise<ServeurInterface | null> {
        const serveur = await super.findById(id);
        return serveur;
    }

    // Méthode pour trouver tous les serveurs
    async findAll(): Promise<ServeurInterface[]> {
        const serveurs = await super.findAll();
        return serveurs;
    }

    // Méthode pour supprimer un serveur
    async delete(id: number): Promise<boolean> {
        const deleted = await super.delete(id);
        return deleted;
    }

}