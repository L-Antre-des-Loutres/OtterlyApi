// src/repositories/repository-serveur.ts

import db from "../db";
import { TokenInterface } from "../interfaces/Token.interfaces";
import { Repository } from "./Repository";

export class RepositoryToken extends Repository<TokenInterface> {
    constructor() {
        super("api_token");
    }

    // Méthode pour récupérer le prochain ID
    async getNextId(): Promise<number> {
        const nextId = await super.getNextId();
        return nextId;
    }

    // Méthode pour sauvegarder un serveur
    async save(token: TokenInterface): Promise<void> {
        await super.save(token);
    }

    // Méthode pour trouver un serveur par ID
    async findById(id: number): Promise<TokenInterface | null> {
        const serveur = await super.findById(id);
        return serveur;
    }

    // Méthode pour trouver tous les serveurs
    async findAll(): Promise<TokenInterface[]> {
        const serveurs = await super.findAll();
        return serveurs;
    }

    // Méthode pour supprimer un serveur
    async delete(id: number): Promise<boolean> {
        const deleted = await super.delete(id);
        return deleted;
    }

    // ---------------- MÉTHODES SUPPLÉMENTAIRES ------------------

    // Méthode pour vérifier le token de l'utilisateur
    async verifyToken(token: string): Promise<boolean> {
        // Lance une requête SQL pour vérifier le token
        const [rows]: [any[], any] = await db.query(`SELECT * FROM ${this.tableName} WHERE token = ?`, [token]);

        // Vérifie si des lignes ont été trouvées et retourne le premier élément, sinon null
        return rows.length > 0;
    }

    // Méthode pour vérifier si un utilisateur possède déjà un token
    async hasToken(username: string): Promise<boolean> {
        const token = await this.findByUsername(username);
        return token !== null;
    }

    private async findByUsername(username: string): Promise<boolean> {
        // Lance une requête SQL afficher si un utilisateur possède déjà un token
        const [rows]: [any[], any] = await db.query(`SELECT * FROM ${this.tableName} WHERE username = ?`, [username]);
        
        // Vérifie si des lignes ont été trouvées et retourne true si oui, sinon false
        return rows.length > 0;
    }

    // Méthode pour trouver un nom d'utilisateur par token
    async findUtilisateurByToken(token: string): Promise<string | null> {
        // Lance une requête SQL afficher si un utilisateur possède déjà un token
        const [rows]: [any[], any] = await db.query(`SELECT utilisateur FROM ${this.tableName} WHERE token = ?`, [token]);
        
        // Vérifie si des lignes ont été trouvées et retourne le premier élément, sinon null
        return rows.length > 0 ? rows[0]?.utilisateur : null;
    }

}