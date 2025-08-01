import jwt from "jsonwebtoken";
import { Service } from "./Service";
import {RepositoryToken} from "../repositories/TokenRepository";
import {TokenInterface} from "../interfaces/TokenInterface";


/* SQL :
CREATE TABLE adl_global.api_token (
    id TINYINT AUTO_INCREMENT,
    utilisateur VARCHAR(100) NULL,
    `role` VARCHAR(100) NULL,
    token VARCHAR(255) NOT NULL,  -- Token généralement plus long, augmenter la taille
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Utilisation de DATETIME pour inclure l'heure
    PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
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
