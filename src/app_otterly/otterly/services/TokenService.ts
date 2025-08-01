import jwt from "jsonwebtoken";
import { Service } from "./Service";
import {RepositoryToken} from "../repositories/TokenRepository";
import {TokenInterface} from "../interfaces/TokenInterface";

/**
 * TokenService class provides methods to handle generation, verification, and management
 * of JSON Web Tokens (JWTs) for users. It includes functionality for saving tokens into
 * a database, verifying token authenticity, and retrieving user information associated
 * with a token.
 *
 * This service makes use of JWT for secure token generation and interacts with a repository
 * for database operations.
 */

export class TokenService extends Service {

    // Secret pour la signature des tokens JWT
    private readonly secret: string;

    // Constructeur de la classe ServiceToken
    private static readonly repositoryToken = new RepositoryToken();

    constructor() {
        super("Token - Service");
        this.secret = process.env.JWT_SECRET ?? "placeholder";
    }

    // Fonction de génération des tokens initiales
    async generateInitialTokens(): Promise<void> {
        // Exemple d'utilisateurs pour lesquels vous souhaitez générer des tokens
        const users: TokenInterface[] =
            [
                { id: 1, utilisateur: "arisoutre", role: "admin", createdAt: this.toSQLDate(new Date()) },
                { id: 2, utilisateur: "multiloutre", role: "admin", createdAt: this.toSQLDate(new Date()) },
                { id: 3, utilisateur: "mineotter", role: "admin", createdAt: this.toSQLDate(new Date()) },
            ];

        for (const user of users) {
            await this.generateToken(user);
        }
    }

    // Fonction de génération d'un token
    async generateToken(payload: TokenInterface): Promise<boolean> {
        try {
            // Génération du token
            const token = jwt.sign(payload, this.secret);
            payload.token = token;

            // Vérifie si l'utilisateur possède déjà un token
            const tokenExist = await TokenService.repositoryToken.findById(payload.id);
            if (tokenExist) {
                // this.logError("Erreur lors de la génération du token : utilisateur possède déjà un token");
                return false;
            }

            await this.save(payload);
            return true;
        } catch (error) {
            this.logError("Erreur lors de la génération du token", error instanceof Error ? error.message : String(error));
            return false;
        }
    }

    // Fonction de sauvegarde du token dans une BDD MySQL
    async save(tokenData: TokenInterface): Promise<void> {
        try {
            // Sauvegarde du token dans la base de données
            await TokenService.repositoryToken.save(tokenData);

        } catch (error) {
            console.error("Erreur lors de la sauvegarde du token dans la base de données :", error);
        }
    }

    // Fonction de vérification du token
    static async verifyToken(token: string): Promise<boolean> {
        return await TokenService.repositoryToken.verifyToken(token);
    }

    // Récupération du nom d'utilisateur associé au token
    static async getUtilisateurByToken(token: string): Promise<string | null> {
        return await TokenService.repositoryToken.findUtilisateurByToken(token);
    }
}
